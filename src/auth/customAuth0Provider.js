import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

// CustomAuth0Provider component
const CustomAuth0Provider = ({ children }) => {
  // Fetching Auth0 domain and client ID from environment variables
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  // Wrapping children components with Auth0Provider
  // Auth0Provider is a component provided by @auth0/auth0-react to integrate Auth0 authentication into React apps
  return (
    <Auth0Provider
      domain={domain} // Setting the Auth0 domain
      clientId={clientId} // Setting the Auth0 client ID
      redirectUri={window.location.origin + '/profile'} // Setting the URL to redirect to after login
    >
      {children}
    </Auth0Provider> //Rendering children components inside the Auth0Provider
  );
};

export default CustomAuth0Provider;
