/* eslint-disable @typescript-eslint/no-explicit-any */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useToken } from "../../../Redux/feature/authSlice";
import { useAppSelector } from "../../../Redux/hook";
import { verifyToken } from "../../../utils/verifyToken";
import { Button } from "../../ui/button";
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const token = useAppSelector(useToken);
  const location = useLocation();
  const navRefs = useRef<HTMLAnchorElement[]>([]);

  let user: any;

  if (token) {
    user = verifyToken(token);
  }

  useEffect(() => {
    navRefs.current.forEach((nav) => {
      // Hover animation
      gsap.fromTo(
        nav,
        { backgroundColor: "transparent" },
        {
          backgroundColor: "#000",
          duration: 0.3,
          ease: "power2.inOut",
          paused: true,
          onHover: true,
        }
      );

      // Active link animation
      if (location.pathname === nav.pathname) {
        gsap.to(nav, {
          backgroundColor: "#101010bc",
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    });
  }, [location]);

  const addToRefs = (el: HTMLAnchorElement) => {
    if (el && !navRefs.current.includes(el)) {
      navRefs.current.push(el);
    }
  };

  return (
    <div>
      <div className="w-full text-white text-center border-b border-[#908a8a] py-3">
        <h2 className="font-serif text-3xl ">GameGrounds</h2>
      </div>
      <div className="relative flex items-center justify-center w-[50%] mx-auto cursor-pointer">
        <ul className="flex justify-center gap-10 font-mono font-bold text-white/80 text-xl">
          {[
            { path: "/", label: "Home" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact" },
            { path: "/booking", label: "Booking" },
            { path: "/facilities", label: "Facilities" },
            { path: `/${user?.role}`, label: "Dashboard" },
          ].map((link, index) => (
            <NavLink
              to={link.path}
              key={index}
              className={({ isActive }) =>
                `hover:underline py-2 my-2 px-5  transition-all duration-500 ${
                  isActive ? "bg-[#101010a0] backdrop-blur-xl text-white" : ""
                }`
              }
              ref={addToRefs}
            >
              {link.label}
            </NavLink>
          ))}
        </ul>
        <div className="space-x-3 flex">
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
          <NavLink to="/log-out">
            <Button className="rounded-none h-[35px] bg-[#101010a0] backdrop-blur-md">
              Log Out
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
