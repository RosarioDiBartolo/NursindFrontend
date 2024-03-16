// Import necessary libraries
import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FileUploader from "../FileUploader";
import { Button } from "../components/ui/button";
import { saveAs } from "file-saver";
import { backend } from "@/config";
import { AuthStatusInfo } from "@/lib/AuthStatus";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { MinusCircleIcon, MinusIcon, XIcon } from "lucide-react";

type value = {
  Notte: number;
  Mattina: number;
  Pomeriggio: number;
};

type YearData = {
  [year: string]: value; // Specify the index signature type as 'string'
};

interface AnalysisData {
  Nome: string;
  Values: YearData;
}

interface yearRowProps {
  year: string;
  values: value;
  Delete: () => void;
}

function Year({ year, values, Delete }: yearRowProps) {
  return (
    <TableRow className="border bg-slate-600 marker:">
      <TableCell>{year}</TableCell>
      <TableCell>{values.Mattina}</TableCell>
      <TableCell>{values.Pomeriggio}</TableCell>
      <TableCell>{values.Notte}</TableCell>
      <TableCell>
        <Button onClick={Delete}  >
          Elimina  
        </Button>
      </TableCell>
    </TableRow>
  );
}

function Block({ Block }: { Block: File }) {
  const [BlockState, setBlockState] = useState<AnalysisData>({
    Nome: "",
    Values: {},
  });
  const [Status, setStatus] = useState<AuthStatusInfo>({
    type: "loading",
    message: "",
  });

  console.log(Status);

  useEffect(() => {
    const analyze = async () => {
      const formData = new FormData();
      console.log("Waiting for a response...");

      formData.append(Block.name, Block);

      return await backend.path("/analyze").post(formData, {
        headers: {
          "Access-Control-Allow-Origin": "*", // Set the appropriate origin or '*' for any origin
          credentials: "same-origin",
        },
      });
    };

    analyze()
      .then((response) => {
        console.log("Request finished");

        setBlockState(response.data as AnalysisData);
        setStatus({
          type: "success",
          message: "Operazione avvenuta con successo",
        });
      })
      .catch((error) => {
        setStatus({ type: "error", message: error as string });
      });
  }, []);

  const Totale = useMemo(() => {
    let Mattine = 0;
    let Pomeriggi = 0;
    let Notti = 0;

    Object.values(BlockState.Values).forEach((Year) => {
      Mattine += Year.Mattina;
      Pomeriggi += Year.Pomeriggio;
      Notti += Year.Notte;
    });

    return { Mattine, Pomeriggi, Notti };
  }, [BlockState]);

  console.log(BlockState);

  console.log(Totale);

  return (
    <div className="m-3 overflow-hidden bg-slate-600 border-b-0 shadow-lg shadow-slate-400  text-white border-muted border-2">
      <Table className="overflow-hidden">
        <TableCaption className="text-nowrap py-5 hover:text-white">
          Conteggi di timbrature (entrata e uscita) per{" "}
          <span className="text-yellow-500">
            {" "}
            {BlockState.Nome || Block.name}{" "}
          </span>
        </TableCaption>
        <TableHeader className="bg-slate-500   w-full">
          <TableRow>
            <TableHead className="text-white  text-center ">Anno</TableHead>{" "}
            <TableHead className="text-white  text-center ">Mattine</TableHead>{" "}
            <TableHead className="text-white  text-center ">
              Pomeriggi
            </TableHead>{" "}
            <TableHead className="text-white  text-center ">Notti</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="overflow-hidden bg-gradient-to-t from-slate-300 rounded-sm  shadow-slate-400 ">
          {Object.entries(BlockState?.Values).map(([year, values]) => (
            <Year
              key={year}
              year={year}
              values={values}
              Delete={() => {
                // Create a new object without the deleted year
                 
                setBlockState(
                  (prev) => {

                  const newValues = { ...(prev.Values) };
                  delete newValues[ year ];
                  return   { ...prev, Values: newValues }
                
                
                 
                })
              }}
            />
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center px-3 justify-between w-full bg-slate-800 text-white">
        <div className="flex">
          <TableCell> Totale:</TableCell>{" "}
          {Object.entries(Totale).map(([k, v]) => (
            <TableCell key={k}>
              {k}: {v}{" "}
            </TableCell>
          ))}
        </div>
        {Status.type === "success" ? (
          <Button
            onClick={() => {
              const nome = BlockState?.Nome;
              if (BlockState) {
                console.log(BlockState);
                Object.entries(BlockState.Values).forEach(([k, v]) => {
                  const content = `${nome}\nMattine:  ${v.Mattina}\nPomeriggi:  ${v.Pomeriggio}\nNotti:  ${v.Notte}`;
                  const blob = new Blob([content], { type: "text/plain" });
                  saveAs(blob, `${nome}-${k}.txt`);
                });
              }
            }}
            className="bg-green-700 text-white  focus:outline-none"
          >
            Scarica i risultati
          </Button>
        ) : Status.type == "loading" ? (
          <LoadingSpinner />
        ) : (
          <span className="flex">
            Errore nel processare i dati... <XIcon className="text-red-700" />{" "}
          </span>
        )}
      </div>
    </div>
  );
}

// Main TasksPage component
function Tasks() {
  const [blocks, setBlocks] = useState<File[]>([]);
  console.log(blocks);
  return (
    <div className="flex flex-col w-full">
      {blocks.length > 0 ? (
        blocks.map((block, idx) => <Block key={idx} Block={block} />)
      ) : (
        <h3 className="text-slate-600 rounded-sm p-6 text-opacity-90 ">
          Comincia l'analisi dei pdf di dipendenti di diverse aziende
          nell'ambito sanitario: <code>Azienda Pisa</code>
        </h3>
      )}
      <footer className="flex justify-end w-[100%] my-6 ">
        <FileUploader
          callback={(file) => {
            setBlocks([...blocks, file]);
          }}
        >
          Aggiungi analisi ...
        </FileUploader>
      </footer>
    </div>
  );
}

export default Tasks;
