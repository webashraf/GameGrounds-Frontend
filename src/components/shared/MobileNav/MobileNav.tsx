/* eslint-disable @typescript-eslint/no-explicit-any */
import gsap from "gsap";
import {
  BookType,
  Calendar,
  Clipboard,
  Home,
  Mail,
  Menu,
  Minimize,
  PanelRightInactive,
  User,
  UserMinus,
  UserPlus,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, useToken } from "../../../Redux/feature/authSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { verifyToken } from "../../../utils/verifyToken";
import "./MobileNav.css";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = useAppSelector(useToken);

  let user: any;

  if (token) {
    user = verifyToken(token);
  }

  const toggleNav = () => {
    if (navRef.current) {
      const newX = !isOpen ? "45%" : "200%";
      gsap.to(navRef.current, {
        x: newX,
        duration: 0.5,
        ease: "power2.out",
      });
      setIsOpen(!isOpen);
    }
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  return (
    <>
      {/* Menu Button */}
      <div className="fixed top-0 py-5 px-5 flex justify-between items-center w-full bg-black/30 backdrop-blur-md">
        <NavLink
          to="/"
          className=" text-3xl font-semibold font-serif text-white"
        >
          GameGrounds
        </NavLink>
        {/* Menu Button */}
        <button
          onClick={toggleNav}
          className=" p-3 bg-slate-500 text-white rounded-full shadow-lg "
        >
          {<Menu />}
        </button>
      </div>

      {/* Navigation Menu */}
      <div
        ref={navRef}
        className="w-[70%] fixed top-0 left-0 h-[100vh] rounded-b-2xl     text-white "
        style={{ transform: "translateX(200%)" }}
      >
        <div className="bg-black/60 backdrop-blur-lg h-full px-5 py-5 w-[230px] ml-auto border border-white/20">
          <div className="w-full px-3 flex items-center justify-end pb-10">
            {/* Logo */}
            <button
              onClick={toggleNav}
              className=" p-3 bg-slate-500 text-white rounded-full shadow-lg "
            >
              {<Minimize />}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="border border-gray-300 py-3 flex flex-col gap-1 flex-wrap shadow-xl rounded-md  justify-center items-start px-1">
            <NavItem to="/" icon={<Home />} label="Home" />
            <NavItem to="/booking" icon={<Calendar />} label="Booking" />
            <NavItem to="/facilities" icon={<Clipboard />} label="Facilities" />
            <NavItem to="/about" icon={<BookType />} label="About" />
            <NavItem to="/contact" icon={<Mail />} label="Contact" />
            <NavItem
              to={`/${user?.role ? user?.role : "sign-in"}`}
              icon={<PanelRightInactive />}
              label="Dashboard"
              forceInactive
            />
            <div className="flex flex-col items-center mt-4 gap-3">
              {user ? (
                <NavItem
                  to="#"
                  icon={<UserMinus />}
                  label="Log Out"
                  onClick={handleLogOut}
                  isSpecial
                />
              ) : (
                <>
                  <NavItem
                    to="/sign-in"
                    icon={<User />}
                    label="Sign In"
                    isSpecial
                  />
                  <NavItem
                    to="/sign-up"
                    icon={<UserPlus />}
                    label="Sign Up"
                    isSpecial
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const NavItem = ({
  to,
  icon,
  label,
  onClick,
  isSpecial = false,
  forceInactive = false,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isSpecial?: boolean;
  forceInactive?: boolean;
}) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `group relative px-4 flex flex-col items-center cursor-pointer ${
        !isSpecial && (forceInactive || !isActive)
          ? ""
          : "rounded-none h-[35px] bg-[#101010a0] backdrop-blur-md pr-10"
      }`
    }
  >
    <div className="flex items-center justify-start">
      <div className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
        {icon}
      </div>
      <p className="text-md uppercase">{label}</p>
    </div>
  </NavLink>
);

export default MobileNav;
