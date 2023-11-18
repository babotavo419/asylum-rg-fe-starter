import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';

// LogoutButton component
export const LogoutButton = () => {
  // useAuth0 hook provides authentication functions like logout
  const { logout } = useAuth0();

  // handleLogout function to initiate the logout process
  const handleLogout = () => {
    // Calling the logout function from Auth0
    // This function logs the user out and redirects them to the specified URL
    logout({
      logoutParams: {
        returnTo: window.location.origin + '/', // After logout, the user will be redirected to the home page
      },
    });
  };

  // Rendering a button that triggers the handleLogout function when clicked
  return (
    <Button
      className="button__logout" // Setting a class name for styling
      onClick={handleLogout} // Setting the onClick handler to the handleLogout function
      style={{ marginLeft: '0px', border: 'none', boxShadow: 'none' }} // Inline styling for the button
    >
      Log Out
    </Button>
  );
};
