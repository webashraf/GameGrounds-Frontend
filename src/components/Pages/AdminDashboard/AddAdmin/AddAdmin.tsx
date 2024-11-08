import UserSignUp from "../../User/SignUp";

const AddAdmin = () => {
  return (
    <div className="lg:px-10 px-5 mx-auto lg:mt-10 mt-32 h-[90vh] overflow-y-scroll hide-scrollbar">
      {/* <h2 className=" lg:px-6 text-4xl text-black uppercase mb-5 text-center">
        Admin Sign up
      </h2> */}
      <UserSignUp uRole="admin" />
    </div>
  );
};

export default AddAdmin;
