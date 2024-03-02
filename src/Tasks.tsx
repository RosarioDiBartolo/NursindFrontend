// Import necessary libraries
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import  LoadingSpinner  from './components/ui/LoadingSpinner';

// Sample data for tasks
const initialTasks = {
  "s8dafE": {
    filename: "file.pdf"
  }
}



interface BasicTask {
  
  status: string;
  filename: string;
  Mattine: number;
  Pomeriggi: number;
  Notti: number;
}

interface Task extends BasicTask{
  id: string;  
}

function Task({ id, status, filename, Mattine, Pomeriggi, Notti }: Task) {
  return (

    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{filename}</TableCell>
      <TableCell className="font-medium">{status === "succes" ? "succes": <LoadingSpinner  className="text-gray"/> }</TableCell>
      <TableCell>{Mattine}</TableCell>
      <TableCell>{Pomeriggi}</TableCell>
      <TableCell>{Notti}</TableCell>

      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>)
}


// Main TasksPage component
function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);

  // Function to add a new task
  const addTask = (id: string, task: Task) => {
    setTasks({ ...tasks, id: task });
  };

  // Function to remove a task
  const removeTask = (taskId: string) => {

    delete tasks[taskId]

    setTasks(tasks);
  };

  return (
    <Table>
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
      <TableBody>
        {Object.entries(tasks).map(([k  , v ]) => <Task id = {k} {...v} key={k} /> ) }
      </TableBody>
    </Table>

  );
}

export default Tasks
