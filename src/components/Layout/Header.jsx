import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../styles/Images/WhiteLogo.png';
import { colors } from '../../styles/data_vis_colors';
import { LoginButton } from '../../auth/logInButton';
import { LogoutButton } from '../../auth/logOutButton';
import { SignupButton } from '../../auth/signUpButton';

const { primary_accent_color } = colors;

function HeaderContent() {
  // useAuth0 hook to check if the user is authenticated
  const { isAuthenticated } = useAuth0();
  // useLocation hook from react-router-dom to get the current location
  const location = useLocation();
  // Check if the current page is the profile page
  const onProfilePage = location.pathname === '/profile';

  // Rendering the header content
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: primary_accent_color,
      }}
    >
      <div className="hrf-logo">
        <a href="https://www.humanrightsfirst.org/">
          <Image width={100} src={Logo} preview={false} alt="HRF logo white" />
        </a>
      </div>

      {/* Navigation links */}
      <div>
        <Link to="/" style={{ color: '#E2F0F7', paddingRight: '75px' }}>
          Home
        </Link>
        <Link to="/graphs" style={{ color: '#E2F0F7', paddingRight: '50px' }}>
          Graphs
        </Link>
        {/* Profile link, only shown if authenticated */}
        {isAuthenticated && (
          <Link
            className="profile"
            to="/profile"
            style={{ color: '#E2F0F7', paddingRight: '40px' }}
          >
            Profile
          </Link>
        )}
        {/* Logout button, only shown if authenticated and on the profile page */}
        {isAuthenticated && onProfilePage && <LogoutButton />}
        {/* Login and Signup buttons, only shown if not authenticated */}
        {!isAuthenticated && (
          <>
            <LoginButton />
            <SignupButton />
          </>
        )}
      </div>
    </div>
  );
}

export { HeaderContent };
