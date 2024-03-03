import React, { useEffect, useState } from "react";
import { backend } from "./config";
import { CheckCheck, FileX2 } from "lucide-react";
import LoadingSpinner from "./components/ui/LoadingSpinner";

import { TableCell, TableRow } from "./components/ui/table";
import {   useGroupData } from "./Group";

interface FileTaskProps {file: File;   idx: string | number;
}

type statusType = "success" | "loading" | "error";


 
const statusOptions = {
    
  success: <CheckCheck className='text-green-600' />,

  error: <FileX2 className="text-red-500" onClick={()=>{

    
  }}/>,

  loading: <LoadingSpinner className="text-gray" />

}

interface TaskResponse{Notti: number; Mattine: number; Pomeriggi: number; Nome : string}

export function FileTask({ file, idx }: FileTaskProps) {
  const { BlockState, setBlockState } = useGroupData();

  const [status, setStatus] = useState<{type: statusType; message: string } >({type: "loading", message: ""})
  const [res, setRes] = useState<TaskResponse>(   );

  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await backend.fetch("/analyze", {
          method: "POST",
          body: formData,
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
        });
  
        const data: TaskResponse = await response.json();
        console.log(data);
  
        setBlockState((prev) => ({
          ...prev,
          Missing: prev.Missing - 1,
          Nomi: [...prev.Nomi, data.Nome],
          Mattine: prev.Mattine + data.Mattine,
          Pomeriggi: prev.Pomeriggi + data.Pomeriggi,
          Notti: prev.Notti + data.Notti,
        }));
  
        setRes(data);
  
        setStatus({
          type: "success",
          message: "File analizzato con successo",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setStatus({
          type: "error",
          message: error.message || "An error occurred",
        });
      }
    };
  
    fetchData();
  }, [file.name]);
 
  return (
    <>
      <TableRow   className="border-none">
        <TableCell>{idx}</TableCell>
        <TableCell>{file.name}</TableCell>
        <TableCell className="font-medium">{statusOptions[status.type]}</TableCell>
        <TableCell>{res?.Mattine}</TableCell>
        <TableCell>{res?.Pomeriggi}</TableCell>
        <TableCell>{res?.Notti}</TableCell>
        <TableCell className="text-right">$250.00</TableCell>
      </TableRow>
    </>
  );
}

export default FileTask;