import Navbar from "@/components/Widgets/Navbar";
import Sidebar from "@/components/Widgets/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
   TableHeader,
   TableRow,
} from "../components/ui/table";
import Map from '@/lib/Map'
import { PlusCircle, User2Icon } from "lucide-react";
import { useState } from "react";
import { Api } from "@/Utils";

interface UserCreds {
  username: string;
  password: string;
}

interface UserRequestProps{

} 
const SportelloDipendenti = new Api("https://sportellodipendenti.policlinico.unict.it/gp4web"); 


function UserRequest({}: UserRequestProps) {
   

  return (
    
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  )
}


function UserRequests({ username, password }: UserCreds) {
   const [Requests, setfirst] = useState<UserRequestProps[]>([{}])

   async function login(username, password) {
    const session = new AbortController();
    try {
        const dashboardResponse = await fetch( "", );
        const loginResponse = await fetch( , { headers });

        const old = dashboardResponse.headers.get("Set-Cookie");

        const data = new URLSearchParams({
            'j_username': username,
            'j_password': password,
            'Login': '  Login  ',
        });

        const logResponse = await SportelloDipendenti.fetch('/restrict/j_security_check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data,
        });

        const newCookie = logResponse.headers.get("Set-Cookie");

        if (old === newCookie) {
            throw new Error(`Login was not successful... ${username} and ${password}`);
        }

        const homeResponse = await SportelloDipendenti.fetch("", {});
        const homeText = await homeResponse.text();
        const soup = new DOMParser().parseFromString(homeText, 'text/html');
        const user = soup.querySelector(".AFCHeaderWelcome b").textContent.split()[0];

        console.log(user, username);

        if (username !== user) {
            throw new Error(`Login failed...`);
        }

        return session;
    } catch (error) {
        console.error(error);
        session.abort();
    }
}

  return (
    <Table className="bg-white">
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Anno</TableHead>
      <TableHead>Mese</TableHead>
      <TableHead>Stato</TableHead>
      <TableHead className="text-right">Scarica</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody> 
  <Map Arr={Requests} Comp={UserRequest} />
  </TableBody>
</Table>

  );
}

function Dashboard() {
  return (
     <div className="bg-slate-400 flex-1 flex flex-col w-full">
      <Navbar />
      <div className="flex h-full flex-1">
        <Sidebar />

        <main className="p-10 relative w-full">
          <Button className="flex absolute gap-3 right-10 z-10">
            <span>Aggiungi richiesta</span> <PlusCircle className="" />{" "}
          </Button>
          <UserRequests password="" email="Salvo Vaccaro" />
        </main>


      </div>
    </div>
  );
}

export default Dashboard;
