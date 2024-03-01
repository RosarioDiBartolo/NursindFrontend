 
import './App.css' 
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import RequireAuth from './RequireAuth'
 
 
function App() {

  return (
      <BrowserRouter>
       
      <Routes>
      <Route path="/" index element={
        <RequireAuth Component = {Home}  />
       } />
      <Route path="/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
  );

}

export default App
