// Updated ProtectedRoute.js
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, Route } from 'react-router-dom';
import { auth } from './config';

interface props{

}
function ProtectedRoute({Comp}){
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if the user is not authenticated
    if (loading === false && user === null) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    // You might want to add a loading spinner or message here
    return null;
  }

  return (<Comp   />);
};

export default ProtectedRoute;
