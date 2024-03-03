// Import necessary libraries
import React, { useState } from "react";
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
import { CheckCheck, CheckIcon, CrossIcon, UserRoundX } from "lucide-react";
import { Button } from "./components/ui/button";

function Blockview(Block: object) {
  const [BlockState, setBlockState] = useState<Group>({
    Missing: Object.keys(Block).length,
    Mattine: 0,
    Pomeriggi: 0,
    Notti: 0,
    Nomi: [],
  });

  const stato = BlockState?.Missing != 0 ? "incompleto" : "Completato"  ;

  return (
    <GroupContext.Provider value={{ BlockState, setBlockState }}>
      <TableBody className="border-solid border-2 rounded-sm shadow-lg shadow-slate-400 ">
        {Object.keys(Block).map((k) => (
          <FileTask key={k} idx={k} file={Block[k]} />
        ))}
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
              <Button  className='bg-green-700 text-white  focus:outline-none'>
                Scarica i risultati
              </Button>
           </TableCell>
          
          <TableCell />
          <TableCell>{BlockState?.Mattine}</TableCell>{" "}
          <TableCell>{BlockState?.Pomeriggi}</TableCell>{" "}
          <TableCell>{BlockState?.Notti}</TableCell>
        </TableRow>
      </TableBody>
    </GroupContext.Provider>
  );
}

// Main TasksPage component
function Tasks() {
  const [blocks, setBlocks] = useState<File[][]>([]);
  return (
    <Table >
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableCell>id</TableCell>
          <TableCell>file</TableCell>
          <TableCell className="font-medium">stato</TableCell>
          <TableCell>Mattine</TableCell>
          <TableCell>Pomeriggi</TableCell>
          <TableCell>Notti</TableCell>

          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableHeader>
      
          
      {blocks.map((block, idx) => (
        <Blockview key={idx} {...block} />
      ))}
 
      <TableFooter className="flex justify-end w-[100%] my-6 ">
        <FileUploader
          callback={(files) => {
            setBlocks([...blocks, [...files]]);
          }}
        >
          Aggiungi analisi ...
        </FileUploader>
      </TableFooter>
    </Table>
  );
}

export default Tasks;
