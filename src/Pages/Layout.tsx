
import Sidebar from "@/components/Widgets/Sidebar";
import { Outlet } from "react-router-dom";
 
import Navbar from "@/components/Widgets/Navbar";

export default function Layout() {
  return (
    <div className='h-screen flex flex-col '>
    <Navbar/>
    <div className="flex flex-1">
      <Sidebar />
  
      <div className="flex-1">
      <h1 className="m-6 text-lg ">
        <strong>Operazioni in corso...</strong>{" "}
      </h1>
       <Outlet />
      </div>
       
    </div>
    
    </div >
  );
}
