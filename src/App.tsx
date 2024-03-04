 
import './App.css' 
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import ProtectedRoute from './ProtectedRoute';
import BustePaga from './Pages/BustePaga';
import { Button } from './components/ui/button';
import { UserRoundCheck } from 'lucide-react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
 
  

import {signOut} from 'firebase/auth'
import {auth} from './config'
 
function App() {
  

  return (
    
      <BrowserRouter>
       <div className='border w-full flex flex-col items-center justify-center p-6 rounded-lg bg-slate-300 shadow-xl shadow-slate-400 resize-x overflow-auto '>
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

      <Routes>
        
        <Route path="/login" element={ <Login />} />
      
        <Route path="/" element={ <ProtectedRoute  Comp = {Home} />} />
  
        <Route path="/buste-paga" element={ <ProtectedRoute  Comp = {BustePaga} />} />
  
      </Routes> 

       <div className="select-container">
       <p className='default'>
       </p>
       </div>
       
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

 
    
  
    </div>  
       
    </BrowserRouter>
  );

}

export default App
