/* eslint-disable @typescript-eslint/no-explicit-any */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { logout, useToken } from "../../../Redux/feature/authSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { verifyToken } from "../../../utils/verifyToken";
import { Button } from "../../ui/button";
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const token = useAppSelector(useToken);
  const navRefs = useRef<HTMLAnchorElement[]>([]);
  const dispatch = useAppDispatch();

  let user: any;

  if (token) {
    user = verifyToken(token);
  }

  const addToRefs = (el: HTMLAnchorElement) => {
    if (el && !navRefs.current.includes(el)) {
      navRefs.current.push(el);
    }
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div>
      <div className="w-full text-white text-center border-b border-[#908a8a] py-3">
        <NavLink to="/" className="font-serif text-3xl ">
          GameGrounds
        </NavLink>
      </div>
      <div className="relative flex items-center justify-center  mx-auto cursor-pointer">
        <ul className="flex justify-center gap-10 font-mono font-bold text-white/80 text-xl pt-1 ">
          {[
            { path: "/", label: "Home" },
            { path: "/facilities", label: "Facilities" },
            { path: "/booking", label: "Booking" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact" },
            // {
            //   path: `/${user?.role ? user?.role : "sign-in"}`,
            //   label: "Dashboard",
            // },
          ].map((link, index) => (
            <NavLink
              to={link.path}
              key={index}
              className={({ isActive }) =>
                link.label === "Dashboard"
                  ? "hover:underline py-2 my-2 px-5 transition-all duration-500"
                  : `hover:underline py-2 my-2 px-5 transition-all duration-500 ${
                      isActive ? "bg-black/60 backdrop-blur-md  text-white" : ""
                    }`
              }
              ref={addToRefs}
            >
              {link.label}
            </NavLink>
          ))}
          {user && (
            <NavLink
              to={`/${user?.role ? user?.role : "sign-in"}`}
              className={
                // ({ isActive }) =>
                "hover:underline py-2 my-2 px-5 transition-all duration-500"
              }
              ref={addToRefs}
            >
              Dashboard
            </NavLink>
          )}
        </ul>
        <div className="space-x-3 flex">
          {user ? (
            <>
              <Button
                onClick={handleLogOut}
                className="rounded-none h-[35px] bg-[#101010a0] backdrop-blur-md"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/sign-in">
                <Button className="rounded-none h-[35px] bg-[#101010a0] backdrop-blur-md">
                  Sign In
                </Button>
              </NavLink>
              <NavLink to="/sign-up">
                <Button className="rounded-none h-[35px] bg-[#101010a0] backdrop-blur-md">
                  Sign Up
                </Button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
