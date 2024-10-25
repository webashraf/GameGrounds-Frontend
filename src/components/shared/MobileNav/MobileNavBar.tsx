/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import {
  BookType,
  Calendar,
  Clipboard,
  Home,
  Mail,
  PanelRightInactive,
  User,
  UserMinus,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import {
  FiChevronDown,
  FiEdit,
  FiPlusSquare,
  FiShare,
  FiTrash,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { logout, useToken } from "../../../Redux/feature/authSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { verifyToken } from "../../../utils/verifyToken";
import { NavItem } from "./MobileNav";
const MobileNavBar = () => {
  const [open, setOpen] = useState(false);
  let user: any;
  const token = useAppSelector(useToken);
  // const [isOpen, setIsOpen] = useState(false);
  // const navRef = useRef<HTMLDivElement>(null);
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
          <Option setOpen={setOpen} Icon={FiEdit} text="Edit" />
          <Option setOpen={setOpen} Icon={FiPlusSquare} text="Duplicate" />
          <Option setOpen={setOpen} Icon={FiShare} text="Share" />
          <Option setOpen={setOpen} Icon={FiTrash} text="Remove" />
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
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ text, Icon, setOpen }: any) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => setOpen(false)}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
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
