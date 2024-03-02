 
import './App.css' 
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';

import ProtectedRoute from './ProtectedRoute';

 
function App() {
  

  return (
      <BrowserRouter>
       
      <Routes>
      <Route path="/login" element={ <Login />} />
    
      <Route path="/" element={ <ProtectedRoute  Comp = {Home} />} />


    </Routes>
    </BrowserRouter>
  );

}

export default App
