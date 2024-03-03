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
import FileUploader from "./FileUploader";
import FileTask from "./FileTask";
import { Group, GroupContext } from "./Group";
import { CheckCheck, UserRoundX } from "lucide-react";
import { Button } from "./components/ui/button";
 

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

    <Table>
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

      <TableBody className="border-solid border-2 rounded-sm shadow-lg shadow-slate-400 ">
      {Object.entries(Block).map(([k, v]) => (
        <FileTask key={k} file={v} />
      ))}      </TableBody>
      <TableFooter> 
      <TableRow className="rounded-sm my-4">
         <TableCell className=" flex justify-center gap-3 ">
          Nomi congruenti
          {new Set(BlockState?.Nomi).size > 1 ? (
            <UserRoundX className="text-red-600" />
          ) : (
            <CheckCheck className="text-green-600" />
          )}{" "}
        </TableCell>
        <TableCell>
          <Button className="bg-green-700 text-white  focus:outline-none">
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
    <div className="flex flex-col">
      {blocks.map((block, idx) => (
        <Block key={idx} {...block} />
      ))}
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
