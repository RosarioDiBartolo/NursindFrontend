 
import './App.css' 
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import AuthProvider from 'react-auth-kit/AuthProvider';
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import createStore from 'react-auth-kit/createStore';



AuthProvider
 
function App() {
  const store = createStore({
    authName:'_auth',
    authType:'cookie',

    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:'
   })

  return (
    <AuthProvider store= {store} >
      <BrowserRouter>
       
      <Routes>
      <Route path="/" index element={
        <RequireAuth  fallbackPath='/login' >
          <Home />
        </RequireAuth>  
       } />
      <Route path="/login" element={<Login />} />

    </Routes>
    </BrowserRouter>
    </AuthProvider>
  );

}

export default App
