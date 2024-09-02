/* eslint-disable @typescript-eslint/no-explicit-any */
import { Lock, Mail, Map, Phone, UnlockIcon, User } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSignUpMutation } from "../../../Redux/api/baseApi";
import CommonHero from "../../shared/CommonHero/CommonHero";
import { Button } from "../../ui/button";
import "./loginRegisterForm.css";

const SignUp = ({ uRole = "user" }) => {
  const [signUp, { error }] = useSignUpMutation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, reset } = useForm<any>();

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

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <CommonHero title="Sign Up" />
      <div className="lg:w-[500px] mx-auto pt-10 pb-20 lg:px-0 md:px-36 px-5 mt-20">
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
            {showPassword ? (
              <Lock className="icon" onClick={togglePasswordVisibility} />
            ) : (
              <UnlockIcon className="icon" onClick={togglePasswordVisibility}  />
            )}

            <input
              {...register("password")}
              placeholder="Password"
              type={showPassword ? "text" : "password"} //
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
          {uRole === "user" && (
            <p>
              Already have an account? &nbsp;
              <NavLink to="/sign-in" className="hover:underline">
                <span className="font-bold">Login now</span>
              </NavLink>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default SignUp;
