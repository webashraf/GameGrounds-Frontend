import UserSignUp from "../../User/userSignUp";

const AddAdmin = () => {
  return (
    <div className="mx-auto lg:mt-10 mt-32 h-[90vh] overflow-y-scroll hide-scrollbar">
      <h2 className="text-6xl text-black uppercase mb-5 text-center">
        Admin Sign up
      </h2>
      <UserSignUp uRole="admin" />
    </div>
  );
};

export default AddAdmin;
