import useAuth from "../hooks/useAuth";

const ProfileMenu = () => {
  const { handleLogout } = useAuth();

  return (
    <div className="absolute right-4 top-20 text-center">
      <button
        className="px-4 py-2 mx-5 my-2 rounded-2xl text-center hover:cursor-pointer outline-2 outline-brand-dark hover:bg-brand bg-brand-light text-white"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
};

export default ProfileMenu;
