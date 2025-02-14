import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();

  return (
    <div>
      Hi Welcome 
      {user?.displayName ? user.displayName : "Back"}
    </div>
  );
};

export default UserHome;
