import { useContext } from "react";
import ProfileCard from "../components/Profile/ProfileCard";
import { AuthContext } from "../context/AuthContext";
const Profile = () => {
  const { user, role } = useContext(AuthContext);
  return <ProfileCard user={user} role={role} />;
};

export default Profile;
