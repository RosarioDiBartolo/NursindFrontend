// Import necessary libraries
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FileUploader from "../FileUploader";
import { Button } from "../components/ui/button";
import { saveAs } from "file-saver";
import { backend } from "@/config";
import { AuthStatusInfo } from "@/lib/AuthStatus";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type YearData = {
  [year: number]: {
    Notte: number;
    Mattina: number;
    Pomeriggio: number;
  };
};

interface AnalysisData {
  Nome: string;
  Values: YearData;
}

function Block(Block: File[]) {
  const [BlockState, setBlockState] = useState<AnalysisData>({Nome: "Vff", Values: {2019: { Pomeriggio: 199 , Mattina: 10, Notte: 239} }});
  const [Status, setStatus] = useState<AuthStatusInfo>({
    type: "loading",
    message: "",
  });

  console.log(Status);

  useEffect(() => {
    const analyze = async () => {
      const formData = new FormData();
      console.log("Analyze");

      Object.values(Block).forEach((file) => formData.append(file.name, file));

      return await backend.path("/analyze").post(formData, {
        headers: {
          "Access-Control-Allow-Origin": "*", // Set the appropriate origin or '*' for any origin
          credentials: "same-origin",
        },
      });
    };

    analyze()
      .then((response) => {
        setBlockState(response.data as AnalysisData);
      })
      .catch((error) => {
        setStatus({ type: "error", message: error as string });
      });
  }, []);

  return (
    <div className="m-3 border-b-0 shadow-lg shadow-slate-400  border-muted border-2">
      <Table className="bg-muted">
        <TableCaption>Lista delle precedenti richieste.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>Nome</TableCell> <TableCell>Size</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody className=" bg-gradient-to-t from-slate-300 rounded-sm  shadow-slate-400 ">
          {Object.entries(Block).map(([k, v]) => (
            <TableRow key={k} className="border-none">
              <TableCell className="text-ellipsis whitespace-nowrap overflow-hidden">
                {v.name}
              </TableCell>
              <TableCell>{v.size} bytes</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {Object.entries(BlockState?.Values).map( ([k,v] )=>(<div className="border bg-slate-600 text-white"><span>{k}</span>   <span>{v.Pomeriggio}</span> <span>{v.Mattina}</span> </div> ) )} 
         
        </TableFooter>
      </Table>
      <div className="flex justify-end w-full p-6 ">
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
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
}

// Main TasksPage component
function Tasks() {
  const [blocks, setBlocks] = useState<File[][]>([]);
  console.log(blocks);
  return (
    <div className="flex flex-col w-full">
      {blocks.length > 0 ? (
        blocks.map((block, idx) => <Block key={idx} {...block} />)
      ) : (
        <h3 className="text-slate-600 rounded-sm p-6 text-opacity-90 ">
          Comincia l'analisi dei pdf di dipendenti di diverse aziende
          nell'ambito sanitario: <code>Azienda Pisa</code>
        </h3>
      )}
      <footer className="flex justify-end w-[100%] my-6 ">
        <FileUploader
          callback={(files) => {
            setBlocks([...blocks, [...files]]);
          }}
        >
          Aggiungi analisi ...
        </FileUploader>
      </footer>
    </div>
  );
}

export default Tasks;
