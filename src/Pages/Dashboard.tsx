import Navbar from "@/components/Widgets/Navbar";
import Sidebar from "@/components/Widgets/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { backend } from "@/config";

import { PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {   useEffect, useState } from "react";
import { AuthStatusInfo } from "@/lib/AuthStatus";
import { DateRangePickerEnhanced } from "@/components/DateRangePickerEnhanced";
import { DateContext, useSelectedDate } from "@/lib/DateProvider";
import { DateRange } from "react-day-picker";
import { addMonths } from "date-fns";
interface UserCreds {
  username: string;
  password: string;
}

interface UserSession {
  JSESSIONID: string;
  JSESSIONIDSSO: string;
}


function DateSelectionProvider({children}: {children: React.ReactNode }  ){
  const [DateRange, setDateRange] = useState<DateRange>(  
    {
      from: new Date(2019, 0, 1),
      to: new Date( ) 
    }   
  ) 

  return ( <DateContext.Provider value={ [DateRange, setDateRange] }>
    {children}
  </DateContext.Provider>

 
  )
  }

 

async function Login({ username, password }: UserCreds): Promise<UserSession> {
  // Make a POST request to the Flask route /login

  const response = await backend.path("/login").post(
    { username, password },
    {
      headers: {
        "Access-Control-Allow-Origin": "*", // Set the appropriate origin or '*' for any origin
        credentials: "same-origin",
      },
    }
  );

  // Parse the JSON response
  const sessionInfo: UserSession = await response.data;

  console.log(sessionInfo);
  return sessionInfo;

  // You can use the session information for further requests or actions
}

interface BustaPagaProps {
  username: string;
  cookies: UserSession;
  year: number | string;
  month: number | string;
}

async function RichiediBustaPaga({
  username,
  cookies,
  year,
  month,
}: BustaPagaProps) {
  // Make a POST request to the Flask route /login

  const response = await backend.path("/request").post(
    { username, cookies, year, month },
    {
      headers: {
        "Access-Control-Allow-Origin": "*", // Set the appropriate origin or '*' for any origin
        credentials: "same-origin",
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

function BustaPagaButton({ username, cookies }: { username: string; cookies: UserSession }) {
  const [selectedDateRange, setDateRange] = useSelectedDate();

  const handleClick = async () => {
    
    try {
      if (selectedDateRange){

        const year = selectedDateRange.from?.getFullYear().toFixed() as string;
        const month = selectedDateRange.from?.getMonth() as number + 1;

        const result = await RichiediBustaPaga({
          username,
          cookies,
          year  ,
          month 
        });

        console.log(result);

        setDateRange( prev => ({ ...prev, from: addMonths(  prev.from as Date , 1) })  )
      }
       
      // Handle the result, if needed
     } catch (error) {
      // Handle errors
      console.error("Error requesting Busta Paga:", error);
    }
  };

  return (
    <Button onClick={handleClick}>
      Nuova richiesta
    </Button>
  );
}


function UserTable({ username, password }: UserCreds) {
  const [Cookies, setCookies] = useState<UserSession>({});
  const [Status, setStatus] = useState<AuthStatusInfo>({
    type: "loading",
    message: "Tentativo di connessione tramite le credenziale dichiarate...",
  });

  useEffect(() => {
    Login({ username, password })
      .catch((err) => setStatus({ type: "error", message: err }))
      .then((cookies) => {
        setStatus((prev) => ({
          ...prev,
          type: "success",
        }));

        setCookies( cookies  as UserSession)
      });
  }, []);

 


  return (
    <DateSelectionProvider>
       
    <div className="p-10">
      <Table className="bg-white rounded-md  ">
        <TableHead className="text-lg ">
          <span className="flex items-center gap-4">
            <Avatar className="w-20 h-20 m-4">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {Status.type === "success" ? username : Status.message}
            <DateRangePickerEnhanced
              showExternalPresets
              showInternalPresets
              numberOfMonths={2}
            />
          </span>
        </TableHead>
        <TableBody className="border text-2xl">
          <TableRow>
            <TableCell>2019</TableCell> <TableCell>Gennaio</TableCell>{" "}
            <TableCell>
              <LoadingSpinner className="text-gray" />
            </TableCell>{" "}
            <TableCell>
              <Button>Scarica</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2019</TableCell> <TableCell>Gennaio</TableCell>{" "}
            <TableCell>
              <LoadingSpinner className="text-gray" />
            </TableCell>{" "}
            <TableCell>
              <Button>Scarica</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2019</TableCell> <TableCell>Gennaio</TableCell>{" "}
            <TableCell>
              <LoadingSpinner className="text-gray" />
            </TableCell>{" "}
            <TableCell>
              <Button>Scarica</Button>
            </TableCell>
          </TableRow>
        </TableBody>

        <TableFooter>
          {Status.type === "success" ? (
             <BustaPagaButton  username={username} cookies={Cookies}  />
          ) : null}
        </TableFooter>
      </Table>
    </div>
  
  
    </DateSelectionProvider>
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
          <UserTable password="cespiti" username="30105" />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
