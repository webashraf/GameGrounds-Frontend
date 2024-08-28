import gsap from "gsap";
import {
  Calendar,
  Clipboard,
  Home,
  Info,
  Mail,
  Menu,
  Minimize,
  User,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./MobileNav.css";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

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
        className="fixed bottom-5 right-5 p-3 bg-slate-500 text-white rounded-full shadow-lg z-50"
      >
        {isOpen ? <Minimize /> : <Menu />}
      </button>
      <div
        ref={navRef}
        className="fixed bottom-0 left-0 w-full rounded-t-2xl flex flex-col justify-center py-5 bg-white/30 backdrop-blur-lg shadow-2xl border border-white/20"
        style={{ transform: "translateY(100%)" }}
      >
        <div className="w-full px-3">
          <div className="flex flex-col ">
            <div className="text-center mb-4 font-semibold font-serif text-3xl">
              GameGrounds
            </div>
            <div className="border border-gray-300 py-3 flex gap-1 flex-wrap shadow-xl rounded-md w-full justify-center">
              <NavItem to="/" icon={<Home />} label="Home" />
              <NavItem to="/about" icon={<Info />} label="About" />
              <NavItem to="/contact" icon={<Mail />} label="Contact" />
              <NavItem to="/booking" icon={<Calendar />} label="Booking" />
              <NavItem
                to="/facilities"
                icon={<Clipboard />}
                label="Facilities"
              />
              <NavItem to="/admin" icon={<User />} label="Dashboard" />
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
    className="group relative px-4 flex flex-col items-center cursor-pointer"
    // activeClassName="bg-yellow-90"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
      {icon}
    </div>
    <p>{label}</p>
    <span className="absolute -top-8 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
      {label}
    </span>
  </NavLink>
);

export default MobileNav;
