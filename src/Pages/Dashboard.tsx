import Navbar from "@/components/Widgets/Navbar";
import Sidebar from "@/components/Widgets/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
   TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { PlusCircle, User2Icon } from "lucide-react";

interface UserCreds {
  email: string;
  password: string;
}

function UserRequest({ email, password }: UserCreds) {
   
  return (
    <Table className="bg-white rounded-md  p-6">
      <TableHead className="text-lg ">
        {email} <User2Icon className="inline" />

        <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Data di inizio" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>
         
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>d</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function Dashboard() {
  return (
    <div className="bg-slate-400   h-full w-full">
      <Navbar />
      <div className="flex h-full flex-1">
        <Sidebar />

        <main className="p-10  h-full relative w-full">
          <Button className="flex absolute gap-3 right-10 z-10">
            <span>Aggiungi richiesta</span> <PlusCircle className="" />{" "}
          </Button>
          <UserRequest password="" email="Salvo Vaccaro" />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
