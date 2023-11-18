import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';

// SignupButton component
export const SignupButton = () => {
  // useAuth0 hook provides authentication functions like loginWithRedirect
  const { loginWithRedirect } = useAuth0();

  // handleSignup function to initiate the signup process
  const handleSignup = async () => {
    // Calling the loginWithRedirect function from Auth0
    // This function is used for both login and signup processes
    await loginWithRedirect({
      appState: {
        returnTo: '/profile', // After signup, the user will be redirected to the profile page
      },
      authorizationParams: {
        screen_hint: 'signup', // This parameter prompts Auth0 to show the signup screen
      },
    });
  };

  // Rendering a button that triggers the handleSignup function when clicked
  return (
    <Button
      className="button__sign-up" // Setting a class name for styling
      onClick={handleSignup} // Setting the onClick handler to the handleSignup function
      style={{ marginLeft: '20px', border: 'none', boxShadow: 'none' }} // Inline styling for the button
    >
      Sign Up
    </Button>
  );
};
