import { Button } from '../components/ui/button';
import { UserRoundCheck } from 'lucide-react';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet } from 'react-router-dom';
  

import {signOut} from 'firebase/auth'
import {auth} from '../config'
 
export default function Layout() {
  return (
<div className='border w-160 flex flex-col items-center justify-center p-6 rounded-lg bg-slate-300 shadow-xl shadow-slate-400 resize-x overflow-auto '>
      <div className='flex w-full  align-middle justify-between'>
        <div className='flex gap-6'>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        </div>
        
        <div className='flex h-full align-middle'>
        <Button onClick={() =>signOut(auth)}>
          Logout < UserRoundCheck  className='ml-5' /> 
        </Button>    
        </div>
   
      </div>
 
         
      <h1 className='m-6'><strong>Workers-Analyzer</strong> </h1>

      <Outlet />

       <div className="select-container">
       <p className='default'>
       </p>
       </div>
       
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

 
    
  
    </div>    )
}
