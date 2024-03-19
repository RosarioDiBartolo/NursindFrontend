import { Button } from "../components/ui/button";
import { UserRoundCheck } from "lucide-react";
import Sidebar from "@/components/Widgets/Sidebar";
import { Outlet } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../config";
import Navbar from "@/components/Widgets/Navbar";

export default function Layout() {
  return (
    <div>
    <Navbar/>
    <div className="flex">
      <Sidebar />
      <Button onClick={() => signOut(auth)}>
        Logout <UserRoundCheck className="ml-5" />
      </Button>

      <h1 className="m-6">
        <strong>Workers-Analyzer</strong>{" "}
      </h1>

      <Outlet />
    </div>
    
    </div>
  );
}
