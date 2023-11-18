import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

// Styled components for styling the profile page
const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 2px 4px #404c4a;
  border-radius: 8px;
  background-color: #707070;
`;

const ProfileHeader = styled.h1`
  font-family: AcuminProMediumItalic;
  text-align: center;
  border-bottom: 2px solid #3e2b2f;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const ProfileInfo = styled.div`
  font-family: AcuminProRegular;
  line-height: 1.6;
`;

const ProfileInfoRow = styled.p`
  margin: 10px 0;
`;

const InfoLabel = styled.strong`
  font-family: AcuminProItalic;
  color: #3e2b2f;
`;

// Profile component
const Profile = () => {
  // Using the useAuth0 hook to manage authentication state
  const { isAuthenticated, isLoading, error } = useAuth0();

  // Show loading message while authentication is in progress
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show error message if authentication fails
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  // Show a message prompting the user to log in if not authenticated
  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  // Static profile data
  const profile = {
    name: 'In$igniPhaCant',
    email: 'chi-rho48@ndaheavenlies.com',
    bio: 'Jesus Is King! He Sets The Boundries Of The Nations!',
    imageUrl: 'https://via.placeholder.com/150',
  };

  // Render the profile page
  return (
    <ProfileContainer>
      <ProfileHeader>Profile Page</ProfileHeader>
      <ProfileImage src={profile.imageUrl} alt="Profile" />
      <ProfileInfo>
        <ProfileInfoRow>
          <InfoLabel>Name:</InfoLabel> {profile.name}
        </ProfileInfoRow>
        <ProfileInfoRow>
          <InfoLabel>Email:</InfoLabel> {profile.email}
        </ProfileInfoRow>
        <ProfileInfoRow>
          <InfoLabel>Bio:</InfoLabel> {profile.bio}
        </ProfileInfoRow>
      </ProfileInfo>
    </ProfileContainer>
  );
};

export default Profile;
