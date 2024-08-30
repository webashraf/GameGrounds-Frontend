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
import { NavLink } from "react-router-dom";
import { useToken } from "../../../Redux/feature/authSlice";
import { useAppSelector } from "../../../Redux/hook";
import { verifyToken } from "../../../utils/verifyToken";
import "./MobileNav.css";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const token = useAppSelector(useToken);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;

  if (token) {
    user = verifyToken(token);
  }

  console.log(user);

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

  return (
    <>
      <button
        onClick={toggleNav}
        className="fixed bottom-5 left-5 p-3 bg-slate-500 text-white rounded-full shadow-lg z-50"
      >
        {isOpen ? <Minimize /> : <Menu />}
      </button>
      <div
        ref={navRef}
        className="fixed bottom-0 left-0 w-full rounded-t-2xl flex flex-col justify-center py-5 bg-black/60 backdrop-blur-lg shadow-2xl border border-white/20 text-white"
        style={{ transform: "translateY(100%)" }}
      >
        <div className="w-full px-3">
          <div className="flex flex-col ">
            <div className="text-center mb-4 font-semibold font-serif text-3xl">
              GameGrounds
            </div>
            <div className="border border-gray-300 py-3 flex gap-1 flex-wrap shadow-xl rounded-md w-full justify-center">
              <NavItem to="/" icon={<Home />} label="Home" />
              <NavItem to="/about" icon={<BookType />} label="About" />
              <NavItem to="/contact" icon={<Mail />} label="Contact" />
              <NavItem to="/booking" icon={<Calendar />} label="Booking" />
              <NavItem
                to="/facilities"
                icon={<Clipboard />}
                label="Facilities"
              />
              <NavItem
                to={`/${user.role}`}
                icon={<PanelRightInactive />}
                label="Dashboard"
              />
              <div className="flex">
                <NavItem to={`/sign-in`} icon={<User />} label="Sign In" />
                <NavItem to={`/sign-up`} icon={<UserPlus />} label="Sign Up" />
                <NavItem to={`/log-out`} icon={<UserMinus />} label="Log Out" />
              </div>
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
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `group relative px-4 flex flex-col items-center cursor-pointer ${
        isActive ? "bg-black rounded-lg" : ""
      }`
    }
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
      {icon}
    </div>
    <p className="text-md uppercase">{label}</p>

  </NavLink>
);

export default MobileNav;
