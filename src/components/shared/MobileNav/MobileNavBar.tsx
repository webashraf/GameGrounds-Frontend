/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown, FiHome } from "react-icons/fi";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { MdOutlineContactMail } from "react-icons/md";
import { PiGiftDuotone } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { TbBrandBooking, TbListDetails } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, useToken } from "../../../Redux/feature/authSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { verifyToken } from "../../../utils/verifyToken";

const NavItems = [
  {
    text: "Home",
    icon: FiHome,
    link: "/",
  },
  {
    text: "Booking",
    icon: TbBrandBooking,
    link: "/booking",
  },
  {
    text: "Facilities",
    icon: PiGiftDuotone,
    link: "/facilities",
  },
  {
    text: "About",
    icon: TbListDetails,
    link: "/about",
  },
  {
    text: "Contact",
    icon: MdOutlineContactMail,
    link: "/contact",
  },
];

const MobileNavBar = () => {
  const [open, setOpen] = useState(false);
  let user: any;
  const token = useAppSelector(useToken);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (token) {
    user = verifyToken(token);
  }
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/sign-in");
  };
  return (
    <div className="w-auto flex items-center justify-end">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 px-3 py-2  text-indigo-50 transition-colors bg-black/30 backdrop-blur-s rounded-sm py-3 uppercase"
        >
          <span className="font-medium text-sm">Menu</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] -left-[10%] w-48 overflow-hidden "
        >
          {NavItems?.map((navItem, i) => (
            <Option
              key={i}
              link={navItem.link}
              setOpen={setOpen}
              Icon={navItem.icon}
              text={navItem.text}
            />
          ))}

          <Option
            setOpen={setOpen}
            link={`${user?.role}`}
            Icon={RxDashboard}
            text="Dashboard"
          />
          <motion.li variants={itemVariants} onClick={() => setOpen(false)}>
            {user ? (
              <span
                className="flex items-center gap-2 w-full p-2 text-sm font-medium whitespace-nowrap rounded-md hover:bg-red-100 text-red-600  transition-colors cursor-pointer "
                onClick={handleLogOut}
              >
                <span className="text-xl">
                  {" "}
                  <IoLogOutOutline />
                </span>{" "}
                Log Out
              </span>
            ) : (
              <NavLink
                to="/sign-in"
                className="flex items-center gap-2 w-full p-2 text-sm font-medium whitespace-nowrap rounded-md hover:bg-zinc-100 text-lime-700 hover:text-zinc-500 transition-colors cursor-pointer"
              >
                <motion.span variants={actionIconVariants}>
                  <span className="text-xl =">
                    <IoLogInOutline />
                  </span>
                </motion.span>
                Sign in
              </NavLink>
            )}
          </motion.li>
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ text, Icon, setOpen, link }: any) => {
  return (
    <motion.li variants={itemVariants} onClick={() => setOpen(false)}>
      <NavLink
        to={link}
        className="flex items-center gap-2 w-full p-2 text-sm font-medium whitespace-nowrap rounded-md hover:bg-zinc-100 text-zinc-950 hover:text-zinc-500 transition-colors cursor-pointer"
      >
        <motion.span className="text-xl" variants={actionIconVariants}>
          <Icon />
        </motion.span>
        <span>{text}</span>
      </NavLink>
    </motion.li>
  );
};

export default MobileNavBar;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
