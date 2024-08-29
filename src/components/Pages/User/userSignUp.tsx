/* eslint-disable @typescript-eslint/no-explicit-any */
import { Lock, Mail, Map, Phone, User } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSignUpMutation } from "../../../Redux/api/baseApi";
import { Button } from "../../ui/button";
import "./loginRegisterForm.css";

const UserSignUp = ({ uRole = "user" }) => {
  const [signUp, { error }] = useSignUpMutation();
  const navigate = useNavigate();

  const defaultValue = {
    name: "Ali Ashraf Tameem",
    email: "aliashraftameem@sgmail.com",
    password: "ali12@sgmail.com",
    phone: "01322909805",
    // role: "user",
    address: "Level-4, 34, Awal Centre, Banani, Dhaka",
  };

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<any>({ defaultValues: defaultValue });
  const onSubmit: SubmitHandler<any> = async (data) => {
    const userInfo = { ...data, role: uRole };

    try {
      const res = await signUp(userInfo).unwrap();

      reset();
      if (res?.success) {
        toast.success("Sign-up Successfully!");

        navigate("/sign-in");
      }
      if (res?.error) {
        toast.error(
          res?.error?.message ? res?.error?.message : "Sign-up failed!"
        );
      }
    } catch (err) {
      console.log({ error, err });
      toast.error("Sign-up Error! Something went wrong.");
    }
  };

  return (
    <div className="lg:w-[500px] mx-auto pt-10 pb-20 lg:px-0 px-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form_container mx-w-full w-full"
      >
        <div className="title_container">
          <p className="title">Sign-up now</p>
          <span className="subtitle">
            Get started with our app, just create an account and enjoy the
            experience.
          </span>
        </div>
        <br />
        <div className="input_container">
          <label className="input_label">Name</label>
          <User className="icon" />
          <input
            {...register("name")}
            placeholder="Full Name"
            type="text"
            className="input_field"
          />
        </div>
        <div className="input_container">
          <label className="input_label">Email</label>
          <Mail className="icon" />
          <input
            {...register("email")}
            placeholder="name@mail.com"
            type="email"
            className="input_field"
          />
        </div>
        <div className="input_container">
          <label className="input_label" htmlFor="password_field">
            Password
          </label>
          <Lock className="icon" />
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            className="input_field"
          />
        </div>
        <div className="input_container">
          <label className="input_label">Phone</label>
          <Phone className="icon" />
          <input
            {...register("phone")}
            placeholder="Contact Number"
            type="text"
            className="input_field"
          />
        </div>
        {/* <div className="input_container">
          <label className="input_label" >
            role
          </label>
          <ShieldAlert className="icon" />
          <input
            {...register("role")}
            placeholder="name@mail.com"
            type="email"
            className="input_field"
          />
        </div> */}
        <div className="input_container">
          <label className="input_label">Address</label>
          <Map className="icon" />
          <input
            {...register("address")}
            placeholder="Your location"
            className="input_field"
            type="text"
          />
        </div>
        <Button title="Sign In" type="submit" className="sign-in_btn w-full">
          <span>Sign Up</span>
        </Button>
        {/* Form bottom */}
        <div className="">
          <p>
            All ready have an account? &nbsp;
            <NavLink to="/sign-in" className="hover:underline">
              <span className="font-bold">Login now</span>
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserSignUp;
