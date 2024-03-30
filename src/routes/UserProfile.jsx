import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const user = useMemo(() => {
    return {
      name: "John Doe",
      bio: "Software Engineer",
      email: "john@example.com",
      location: "New York",
      website: "https://example.com",
      avatar: "https://via.placeholder.com/150", // Placeholder URL for the avatar
    };
  }, []);
  return (
    <div className="user-profile">
      <img className="profile-picture" src={user.avatar} alt={user.name} />
      <div className="profile-details">
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
        <ul className="profile-info">
          <li>
            <strong>Email:</strong> {user.email}
          </li>
          <li>
            <strong>Location:</strong> {user.location}
          </li>
          <li>
            <strong>Website:</strong> <a href={user.website}>{user.website}</a>
          </li>
        </ul>
      </div>
      <Link to={`/`}>Home</Link>
    </div>
  );
};

export default UserProfile;
