import React from 'react';
import AuthenticationService from './AuthenticationService';
import { Navigate} from 'react-router-dom' 

const AuthenticatedRoute = (props) => {
  if(AuthenticationService.isLogged()){
      return {...props.children}
    }
  else
      return <Navigate to="/" />
};

export default AuthenticatedRoute;
