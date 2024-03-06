// Import necessary libraries
import { useState } from "react";
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
import Task from "../components/Task-Management/Task";
import { Group, GroupContext } from "../components/Task-Management/Group";
import { CheckCheck, UserRoundX } from "lucide-react";
import { Button } from "../components/ui/button";
import { saveAs } from "file-saver";

function Block(Block: File[]) {
  const [BlockState, setBlockState] = useState<Group>({
    Missing: Object.keys(Block).length,
    Mattine: 0,
    Pomeriggi: 0,
    Notti: 0,
    Nomi: [],
  });
  return (
    <GroupContext.Provider value={{ BlockState, setBlockState }}>
      <Table className='bg-muted'>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>file</TableCell>
            <TableCell className="font-medium">stato</TableCell>
            <TableCell>Mattine</TableCell>
            <TableCell>Pomeriggi</TableCell>
            <TableCell>Notti</TableCell>
            <TableCell>Tempo richiesto</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody className=" bg-gradient-to-t from-slate-300 rounded-sm  shadow-slate-400 ">
          {Object.entries(Block).map(([k, v]) => (
            <Task key={k} file={v} />
          ))} 
        </TableBody>
        <TableFooter>
          <TableRow className="rounded-sm my-4  ">
            <TableCell className=" flex justify-center gap-3 ">
              {new Set(BlockState?.Nomi).size > 1 ? (
                <span>
                  <span>Nomi icongruenti...</span>{" "}
                  <UserRoundX className="text-red-600" />{" "}
                </span>
              ) : (
                <span>
                  <span>
                  Nomi congruenti
                    </span>   <CheckCheck className="text-green-600" />{" "}
                </span>
              )}{" "}
            </TableCell>
            <TableCell>
              <Button
                onClick={() => {
                  const nome = BlockState.Nomi[0];
                  const content = `${nome}\nMattine:  ${BlockState.Mattine}\nPomeriggi:  ${BlockState.Pomeriggi}\nNotti:  ${BlockState.Notti}`;

                  const blob = new Blob([content], { type: "text/plain" });
                  saveAs(blob, `${nome}.txt`);
                }}
                className="bg-green-700 text-white  focus:outline-none"
              >
                Scarica i risultati
              </Button>
            </TableCell>
            <TableCell />
            <TableCell>{BlockState?.Mattine}</TableCell>{" "}
            <TableCell>{BlockState?.Pomeriggi}</TableCell>{" "}
            <TableCell>{BlockState?.Notti}</TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </GroupContext.Provider>
  );
}

// Main TasksPage component
function Tasks() {
  const [blocks, setBlocks] = useState<File[][]>([]);
  return (
    <div className="flex flex-col w-full">
      {blocks.length > 0 ? (blocks.map((block, idx) => (
        <Block key={idx} {...block} />
      ))):   (
      <h3 className='text-slate-600 rounded-sm p-6 text-opacity-90 '>
      Comincia l'analisi dei pdf di dipendenti di diverse aziende nell'ambito sanitario: <code>Azienda Pisa</code> 
    </h3>
    )
      
}
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
