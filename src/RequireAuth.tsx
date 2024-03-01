import  { FunctionComponent } from 'react';

import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from './config'

interface ProtectedProps{
  Component: FunctionComponent
}

const ProtectedRoute = ({ Component  }: ProtectedProps ) => {
  // a custom hook to keep track of user's auth status
  const [user ] = useAuthState(auth);
  return (
    <>
      {
        // display a spinner while auth status being checked
       user? <Component />
            // else render an unauthorised component
            // stating the reason why it cannot access the route
            : <Navigate to = "/login" replace  />
      }
    </>
  );
};

export default ProtectedRoute;