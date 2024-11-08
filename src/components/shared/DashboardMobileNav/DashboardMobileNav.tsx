/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "../../ui/button";
import {
  BookImageIcon,
  FileEdit,
  FilePlus,
  FileSliders,
  Home,
  LogOut,
  ShieldPlus,
  SquareKanban,
} from "lucide-react";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, useToken } from "../../../Redux/feature/authSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { verifyToken } from "../../../utils/verifyToken";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";

export function DashboardMobileNav() {
  const [position, setPosition] = useState("bottom");

  const token = useAppSelector(useToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  let user: any;

  if (token) {
    user = verifyToken(token);
  }

  return (
    <div className="grid grid-cols-2 gap-2 lg:hidden">
      <Sheet key="left">
        <SheetTrigger asChild>
          <Button variant="outline" className=" ">
            <FiMenu size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent
          className="bg-slate-900/30 backdrop-blur-md pt-14 "
          side="left"
        >
          <SheetHeader>
            <SheetTitle className="">
              <h3 className="font-serif text-2xl text-center uppercase text-white">
                {user?.role} Dashboard
              </h3>
            </SheetTitle>
            <SheetDescription className=" lg:pb-10">
              <p className="text-center text-sm lowercase text-gray-300">
                {user?.email}
              </p>
              <div className="w-full h-[1px] mt-5 bg-white"></div>
            </SheetDescription>
          </SheetHeader>
          {user?.role === "admin" ? (
            <div className="flex flex-col gap-4 text-white ">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `uppercase px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-4 ${
                    isActive
                      ? "bg-white/20 backdrop-blur-lg text-white"
                      : "text-gray-300 hover:bg-white/20 hover:backdrop-blur-lg hover:text-white"
                  }`
                }
              >
                <Home />
                Home
              </NavLink>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `uppercase px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-4 ${
                    isActive && window.location.pathname === "/admin"
                      ? "bg-white/20 backdrop-blur-lg text-white"
                      : "text-gray-300 hover:bg-white/20 hover:backdrop-blur-lg hover:text-white"
                  }`
                }
              >
                <BookImageIcon />
                My Dashboard
              </NavLink>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className={`bg-transparent flex justify-start gap-4`}>
                    <FileSliders /> Facility Management
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-slate-900/30 backdrop-blur-md">
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                  >
                    <DropdownMenuRadioItem value="top" className="p-0 m-1 ">
                      <NavLink
                        to="/admin/facilities-add"
                        className={({ isActive }) =>
                          `w-full py-2 px-4 rounded-lg transition-all duration-300 text-whit ease-in-out flex items-center gap-4 ${
                            isActive
                              ? "bg-white/20 backdrop-blur-lg text-white"
                              : "text-gray-300 hover:bg-white/20 hover:backdrop-blur-lg hover:text-black"
                          }`
                        }
                      >
                        <FilePlus />
                        Add Facility
                      </NavLink>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="top" className="p-0 m-1 ">
                      <NavLink
                        to="/admin/facilities-update"
                        className={({ isActive }) =>
                          `w-full py-2 px-4 rounded-lg transition-all duration-300 text-whit ease-in-out flex items-center gap-4 ${
                            isActive
                              ? "bg-white/20 backdrop-blur-lg text-white"
                              : "text-gray-300 hover:bg-white/20 hover:backdrop-blur-lg hover:text-black"
                          }`
                        }
                      >
                        <FileEdit />
                        Update Facility
                      </NavLink>
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <NavLink
                to="/admin/booking-management"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-4 ${
                    isActive
                      ? "bg-white/20 backdrop-blur-lg text-white"
                      : "text-gray-300 hover:bg-white/20 hover:backdrop-blur-lg hover:text-white"
                  }`
                }
              >
                <SquareKanban />
                Booking Management
              </NavLink>
              <NavLink
                to="/admin/add-admin"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-4 ${
                    isActive
                      ? "bg-white/20 backdrop-blur-lg text-white"
                      : "text-gray-300 hover:bg-white/20 hover:backdrop-blur-lg hover:text-white"
                  }`
                }
              >
                <ShieldPlus />
                Add Admin
              </NavLink>
              <div
                onClick={() => handleLogOut()}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-4 hover:bg-white/20 hover:backdrop-blur-lg text-red-500`}
              >
                <LogOut />
                Log Out
              </div>
            </div>
          ) : (
            <div className="  w-[300px h-screen p-5">
              <div className="">
                <div className="text-white pb-2 mb-5"></div>

                <div className="flex flex-col gap-4 text-white">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `uppercase px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-4 ${
                        isActive
                          ? "bg-white/20 backdrop-blur-lg text-white"
                          : "text-gray-300 hover:bg-white/20 hover:backdrop-blur-lg hover:text-white"
                      }`
                    }
                  >
                    <Home />
                    Home
                  </NavLink>
                  <NavLink
                    to="/user"
                    className={({ isActive }) =>
                      `uppercase px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-4 ${
                        isActive && window.location.pathname === "/user"
                          ? "bg-white/20 backdrop-blur-lg text-white"
                          : "text-gray-300 hover:bg-white/20 hover:backdrop-blur-lg hover:text-white"
                      }`
                    }
                  >
                    <BookImageIcon />
                    My Dashboard
                  </NavLink>
                  <NavLink
                    to="/user/my-booking"
                    className={({ isActive }) =>
                      `uppercase px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-4 ${
                        isActive
                          ? "bg-white/20 backdrop-blur-lg text-white"
                          : "text-gray-300 hover:bg-white/20 hover:backdrop-blur-lg hover:text-white"
                      }`
                    }
                  >
                    <BookImageIcon />
                    My Booking
                  </NavLink>
                  <div
                    onClick={() => handleLogOut()}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-4 hover:bg-white/20 hover:backdrop-blur-lg text-red-500`}
                  >
                    <LogOut />
                    Log Out
                  </div>
                </div>
              </div>
            </div>
          )}
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
