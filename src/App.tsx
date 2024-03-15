 
import './App.css' 
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from './Pages/Login';
import ProtectedRoute from './ProtectedRoute';
import BustePaga from './Pages/BustePaga';
import Layout from './Pages/Layout';
import Tasks from './Pages/Tasks';
  
function App() {
  

  return (
    
      <BrowserRouter>
 

      <Routes>

        <Route  path="/" element = {<ProtectedRoute Comp={Layout}  />  } >

          <Route path = "/" index element={ <Tasks   /> } />
    
          <Route path="/buste-paga" element={ <BustePaga   />} />

        </Route>
 
        <Route path="/login" element={ <Login />} />
       
  
      </Routes> 
 
       
    </BrowserRouter>
  );

}

export default App
