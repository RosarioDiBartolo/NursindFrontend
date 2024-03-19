import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { saveAs } from "file-saver";
import { backend } from "@/config";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { XIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
type value = {
  Notte?: number;
  Mattina?: number;
  Pomeriggio?: number;
};

type YearData = {
  [year: string]: value; // Specify the index signature type as 'string'
};

export interface AnalysisData {
  Nome: string;
  Values: YearData;
}

interface yearRowProps {
  year: string;
  values: value;
  Delete: () => void;
}

type StateInfo<T> = {
  message: string | object;
  type: T;
};

export type AnalysisState = "default" | "loading" | "success" | "error";

export type AnalysisStateInfo = StateInfo<AnalysisState>;

export function Year({ year, values, Delete }: yearRowProps) {
  return (
    <TableRow className="border   marker:">
      <TableCell className="p-2">{year}</TableCell>
      <TableCell className="p-2">{values.Mattina || 0 }</TableCell>
      <TableCell className="p-2">{values.Pomeriggio || 0}</TableCell>
      <TableCell className="p-2">{values.Notte || 0}</TableCell>
      <TableCell className="p-2">
        <Button onClick={Delete}>Elimina</Button>
      </TableCell>
    </TableRow>
  );
}



export type Azienda = undefined | "policlinico" | "pisa"
function Block({ Block }: { Block: File; }) {
  const [Azienda, setAzienda] = useState<Azienda>();

  const [BlockState, setBlockState] = useState<AnalysisData>({
    Nome: Block.name,
    Values: {},
  });

  const [Status, setStatus] = useState<AnalysisStateInfo>({
    type: "default",
    message: Block.name,
  });

  const analyze = () => {
    const formData = new FormData();
    formData.append(Block.name, Block);
    if (Azienda) {
      const response = backend.path(`/analyze/${Azienda}`).post(formData, {
        headers: {
          "Access-Control-Allow-Origin": "*", // Set the appropriate origin or '*' for any origin
          credentials: "same-origin",
        },
      });
 
      setStatus((prev) => ({ ...prev, type: "loading" }));

      console.log("Waiting for a response...");


      response.then((response) => {
          console.log("Request finished");

          setBlockState(response.data as AnalysisData);
          setStatus({
            type: "success",
            message: "Operazione avvenuta con successo",
          });
        }).catch((error) => {
          setStatus({ type: "error", message: error as string });
        });
    }



  };

  console.log(Status);

  const Totale = useMemo(() => {
    let Mattine = 0;
    let Pomeriggi = 0;
    let Notti = 0;

    Object.values(BlockState.Values).forEach((Year) => {
      Mattine += Year.Mattina || 0;
      Pomeriggi += Year.Pomeriggio || 0;
      Notti += Year.Notte || 0;
    });

    return { Mattine, Pomeriggi, Notti };
  }, [BlockState]);

  const ConversionTable: Record<AnalysisState, React.ReactNode> = {
    default: "",
    success: (
      <Button
        onClick={() => {
          if (BlockState) {
            console.log(BlockState);
            Object.entries(BlockState.Values).forEach(([k, v]) => {
              const content = `${BlockState.Nome}\nMattine:  ${v.Mattina}\nPomeriggi:  ${v.Pomeriggio}\nNotti:  ${v.Notte}`;
              const blob = new Blob([content], { type: "text/plain" });
              saveAs(blob, `${BlockState.Nome}-${k}.txt`);
            });
          }
        }}
        className="bg-green-700 text-white  focus:outline-none"
      >
        Scarica i risultati
      </Button>
    ),
    loading: <LoadingSpinner className="w-full" />,

    error: (
      <span className="flex">
        Errore nel processare i dati... <XIcon className="text-red-700" />{" "}
      </span>
    ),
  };
  return (
    <div className="m-3 overflow-hidden   border-b-0 shadow-lg shadow-slate-400  text-white border-muted border-2">
      <Table className="overflow-hidden bg-slate-800 ">
        <TableCaption className="text-nowrap absolute hover:text-white"></TableCaption>
        <TableHeader className=" w-full">
          <TableRow className=" ">
            <TableHead className="text-white  text-center ">Anno</TableHead>
            <TableHead className="text-white  text-center ">Mattine</TableHead>
            <TableHead className="text-white  text-center ">
              Pomeriggi{" "}
            </TableHead>
            <TableHead className="text-white  text-center ">Notti</TableHead>
            <TableHead className="text-white  text-center ">Azione</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="overflow-hidden bg-slate-500 bg-gradient-to-t from-slate-700 rounded-sm   ">
          {Object.entries(BlockState?.Values).map(([year, values]) => (
            <Year
              key={year}
              year={year}
              values={values}
              Delete={() => {
                // Create a new object without the deleted year
                setBlockState((prev) => {
                  const newValues = { ...prev.Values };
                  delete newValues[year];
                  return { ...prev, Values: newValues };
                });
              }} />
          ))}
          <TableRow>
            <TableCell colSpan={1}>Totale:</TableCell>
            {Object.entries(Totale).map(([k, v]) => (
              <TableCell className=" " key={k}>
                {k}: {v}
              </TableCell>
            ))}
            <TableCell>{ConversionTable[Status.type]}</TableCell>
          </TableRow>
        </TableBody>

        <TableFooter className="bg-slate-800 hover:text-slate-900">
          <TableRow>
            <TableCell>
              <Button
                className="bg-slate-500 bg-gradient-to-t from-slate-700"
                onClick={analyze}
              >
                Richiedi il Conteggio...
              </Button>
            </TableCell>

            <TableCell colSpan={3} className="">
              Conteggi di timbrature (entrata e uscita) per
              <span className="text-yellow-500 mx-1">
                {BlockState.Nome || Block.name}
              </span>
            </TableCell>
            <TableCell>
              <Select onValueChange={(value) => setAzienda(value as Azienda)}>
                <SelectTrigger className="w-[180px] bg-slate-500 bg-gradient-to-t from-slate-700">
                  <SelectValue placeholder="Azienda" />
                </SelectTrigger>
                <SelectContent className="bg-slate-500 bg-gradient-to-t from-slate-700 text-white">
                  <SelectItem value="Policlinico">Policlinico</SelectItem>
                  <SelectItem value="Pisa">Pisa</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>

        </TableFooter>
      </Table>
    </div>
  );
}
export default Block;