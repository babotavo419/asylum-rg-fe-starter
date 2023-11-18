import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';

// LoginButton component
export const LoginButton = () => {
  // useAuth0 hook provides authentication functions like loginWithRedirect
  const { loginWithRedirect } = useAuth0();

  // handleLogin function to initiate the login process
  const handleLogin = async () => {
    // Calling the loginWithRedirect function from Auth0
    // This function redirects the user to the Auth0 login page
    await loginWithRedirect({
      appState: {
        returnTo: '/profile', // After login, the user will be redirected to the '/profile' route
      },
    });
  };

  // Rendering a button that triggers the handleLogin function when clicked
  return (
    <Button
      className="button__login" // Setting a class name for styling
      onClick={handleLogin} // Setting the onClick handler to the handleLogin function
      style={{ marginLeft: '0px', border: 'none', boxShadow: 'none' }} // Inline styling for the button
    >
      Log In
    </Button>
  );
};
