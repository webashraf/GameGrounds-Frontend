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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;

  if (token) {
    user = verifyToken(token);
  }

  const toggleNav = () => {
    if (navRef.current) {
      const newY = isOpen ? "100%" : "0%";
      gsap.to(navRef.current, {
        y: newY,
        duration: 0.5,
        ease: "power2.out",
      });
      setIsOpen(!isOpen);
    }
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/sign-in"); // Redirect to sign-in page after logout
  };

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={toggleNav}
        className="fixed top-5 right-5 p-3 bg-slate-500 text-white rounded-full shadow-lg z-50"
      >
        {isOpen ? <Minimize /> : <Menu />}
      </button>

      {/* Navigation Menu */}
      <div
        ref={navRef}
        className="fixed top-0 left-0 w-full h-screen rounded-b-2xl flex flex-col justify-start py-5 bg-black/60 backdrop-blur-lg shadow-2xl border border-white/20 text-white"
        style={{ transform: "translateY(100%)" }}
      >
        <div className="w-full px-3 flex items-center justify-between">
          {/* Logo */}
          <div className="text-3xl font-semibold font-serif">GameGrounds</div>
          {/* Menu Button (Redundant if already present) */}
        </div>

        {/* Navigation Links */}
        <div className="border border-gray-300 py-3 flex flex-col gap-1 flex-wrap shadow-xl rounded-md  justify-center items-start">
          <NavItem to="/" icon={<Home />} label="Home" />
          <NavItem to="/booking" icon={<Calendar />} label="Booking" />
          <NavItem to="/facilities" icon={<Clipboard />} label="Facilities" />
          <NavItem to="/about" icon={<BookType />} label="About" />
          <NavItem to="/contact" icon={<Mail />} label="Contact" />
          <NavItem
            to={`/${user?.role ? user?.role : "sign-in"}`}
            icon={<PanelRightInactive />}
            label="Dashboard"
          />
          <div className="flex flex-col items-center mt-4">
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
    </>
  );
};

const NavItem = ({
  to,
  icon,
  label,
  onClick,
  isSpecial = false,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isSpecial?: boolean;
}) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `group relative px-4 flex flex-col items-center cursor-pointer ${
        !isSpecial && isActive ? "bg-black rounded-lg" : ""
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
