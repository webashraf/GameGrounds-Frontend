import { Lock, Mail, Map, Phone, UnlockIcon, User } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useSignUpMutation } from "../../../Redux/api/auth.api";
import CommonHero from "../../shared/CommonHero/CommonHero";
import { Button } from "../../ui/button";
import "./loginRegisterForm.css";

type TSignUpFormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

const SignUp = ({ uRole = "user" }) => {
  const [signUp, { error }] = useSignUpMutation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSignUpFormData>();

  const onSubmit: SubmitHandler<TSignUpFormData> = async (data) => {
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
    <>
      <CommonHero title="Sign Up" />
      <div
        className={`lg:w-[500px] mx-auto pt-10 pb-20 lg:px-0 md:px-36 mt-20 ${
          uRole === "user" ? "px-5" : ""
        }`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form_container mx-w-full w-full"
        >
          <div className="title_container">
            <p className="title">
              Sign-up as {uRole === "user" ? "User" : "Admin"}
            </p>
            <span className="subtitle">
              Get started with our app, just create an account and enjoy the
              experience.
            </span>
          </div>
          <br />
          <div className="input_container">
            <label className="input_label">Name</label>
            <div className="relative">
              <User className="icon" />
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Full Name"
                type="text"
                className="input_field"
              />
            </div>
            {errors.name && (
              <span className="error_message text-red-600">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="input_container">
            <label className="input_label">Email</label>
            <div className="relative w-full">
              <Mail className="icon" />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="name@mail.com"
                type="email"
                className="input_field"
              />
            </div>
            {errors.email ? (
              <span className="error_message text-red-600">
                {errors.email.message}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="input_container">
            <label className="input_label" htmlFor="password_field">
              Password
            </label>
            <div className="relative">
              {showPassword ? (
                <Lock
                  className="icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <UnlockIcon
                  className="icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="input_field"
              />
            </div>
            {errors.password && (
              <span className="error_message text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="input_container">
            <label className="input_label">Phone</label>
            <div className="relative">
              <Phone className="icon" />
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Invalid phone number",
                  },
                })}
                placeholder="Contact Number"
                type="text"
                className="input_field"
              />
            </div>
            {errors.phone && (
              <span className="error_message text-red-600">
                {errors.phone.message}
              </span>
            )}
          </div>
          <div className="input_container">
            <label className="input_label">Address</label>
            <div className="relative">
              <Map className="icon" />
              <input
                {...register("address", { required: "Address is required" })}
                placeholder="Your location"
                className="input_field"
                type="text"
              />
            </div>
            {errors.address && (
              <span className="error_message text-red-600">
                {errors.address.message}
              </span>
            )}
          </div>
          <Button
            title="Sign In"
            type="submit"
            className="sign-in_btn w-full bg-black"
          >
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
