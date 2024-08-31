/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../../../Redux/api/baseApi";
import { setUser } from "../../../Redux/feature/authSlice";
import { useAppDispatch } from "../../../Redux/hook";
import { verifyToken } from "../../../utils/verifyToken";
import CommonHero from "../../shared/CommonHero/CommonHero";
import { Button } from "../../ui/button";
import "./loginRegisterForm.css";

const Login = () => {
  const [login, { error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<any>();
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const res = await login(data).unwrap();
      console.log("user", res);
      reset();
      if (res?.success) {
        const user = verifyToken(res?.token);

        dispatch(setUser({ user: user, token: res.token }));
        toast.success("Login Successfully!");

        navigate("/");
      }
      if (res?.error) {
        toast.error(
          res?.error?.message ? res?.error?.message : "Login failed!"
        );
      }
    } catch (err) {
      console.log({ error, err });
      toast.error("Login Failed! Something went wrong.");
    }
  };

  return (
    <>
      <CommonHero title="login" />
      <div className="lg:w-[500px] mx-auto pt-10 pb-20 lg:px-0 md:px-36 px-5 mt-20">
        <form onSubmit={handleSubmit(onSubmit)} className="form_container">
          <div className="title_container">
            <p className="title">Login to your Account</p>
            <span className="subtitle">
              Get started with our app, just create an account and enjoy the
              experience.
            </span>
          </div>
          <br />
          <div className="input_container">
            <label className="input_label" htmlFor="email_field">
              Email
            </label>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="#141B34"
                d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"
              ></path>
              <path
                strokeLinejoin="round"
                strokeWidth="1.5"
                stroke="#141B34"
                d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
              ></path>
            </svg>
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
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              <path
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="#141B34"
                d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"
              ></path>
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="#141B34"
                d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"
              ></path>
              <path
                fill="#141B34"
                d={
                  showPassword
                    ? "M12 4L8 8h8l-4-4zm0 10l4-4H8l4 4z"
                    : "M12 4L8 8h8l-4-4zm0 10l4-4H8l4 4z"
                } // Change icon based on visibility state
              ></path>
            </svg>
            <input
              {...register("password")}
              placeholder="Password"
              type={showPassword ? "text" : "password"} //
              className="input_field"
            />
          </div>
          <Button title="Sign In" type="submit" className="sign-in_btn w-full">
            <span>Sign In</span>
          </Button>
          {/* form bottom */}
          <div>
            <p>
              Don't have an account? &nbsp;
              <NavLink to="/sign-up" className="hover:underline">
                <span className="font-bold">Sign-Up</span>
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
