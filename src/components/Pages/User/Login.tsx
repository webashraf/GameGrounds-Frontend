/* eslint-disable @typescript-eslint/no-explicit-any */
import { Lock, Mail, UnlockIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../../../Redux/api/auth.api";
import { setUser } from "../../../Redux/feature/authSlice";
import { useAppDispatch } from "../../../Redux/hook";
import { verifyToken } from "../../../utils/verifyToken";
import CommonHero from "../../shared/CommonHero/CommonHero";
import { Button } from "../../ui/button";
import "./loginRegisterForm.css";

type TLoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [login, { error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState<TLoginFormInputs>({
    email: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TLoginFormInputs>({
    defaultValues: loginCredentials,
  });

  useEffect(() => {
    reset(loginCredentials);
  }, [loginCredentials, reset]);

  const onSubmit: SubmitHandler<TLoginFormInputs> = async (data) => {
    try {
      const res = await login(data).unwrap();
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
      toast.error(
        (error as any)?.data?.message
          ? (error as any)?.data?.message
          : "Login Failed! Something went wrong."
      );
    }
  };

  return (
    <>
      <CommonHero title="Login" />
      <div className="lg:w-[500px] mx-auto pt-10 pb-20 lg:px-0 md:px-36 px-5 mt-20 ">
        <div className="form_container w-[80%] mx-auto">
          <div className="title_container px-">
            <p className="title">Login to your Account</p>
            <span className="subtitle">
              Get started with our app, just create an account and enjoy the
              experience.
            </span>
            <span className="flex gap-2">
              <span
                className=" rounded-lg text-sm py-1 h-7"
                // variant={"outline"}
                onClick={() =>
                  setLoginCredentials({
                    email: "ali@gmail.com",
                    password: "123456",
                  })
                }
              >
                User Credentials
              </span>
              <span
                className=" rounded-lg text-sm py-1 h-7"
                // variant={"outline"}
                onClick={() =>
                  setLoginCredentials({
                    email: "admin@gmail.com",
                    password: "ashraf@gmail.com",
                  })
                }
              >
                Admin Credentials
              </span>
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
            <br />
            <div className="input_container">
              <label className="input_label" htmlFor="email_field">
                Email
              </label>
              <div className="relative">
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
              {errors.email && (
                <span className="error_message text-red-600">
                  {errors.email.message}
                </span>
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
            <Button
              title="Sign In"
              type="submit"
              className="sign-in_btn w-full bg-black mt-5"
            >
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
      </div>
    </>
  );
};

export default Login;
