/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BookImageIcon,
  FileEdit,
  FilePlus,
  FileSliders,
  Home,
  ShieldPlus,
  SquareKanban,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useToken } from "../../../Redux/feature/authSlice";
import { useAppSelector } from "../../../Redux/hook";
import { verifyToken } from "../../../utils/verifyToken";
import { DashboardMobileNav } from "../../shared/DashboardMobileNav/DashboardMobileNav";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const UserDashboardLayout = () => {
  const [position, setPosition] = useState("bottom");

  const token = useAppSelector(useToken);

  let user: any;

  if (token) {
    user = verifyToken(token);
  }
  // if (user.role === "admin" || user.role === "user") {
  //   console.log(user.role);
  //   return <UnAuthorizedUser />;
  // }

  return (
    <div>
      <div className="flex">
        <div className="lg:hidden fixed top-0  flex items-center  justify-between p-5  z-50 bg-black/80 w-full backdrop-blur-md">
          <DashboardMobileNav />
          <h2 className="text-4xl text-white font-serif">GameGround</h2>
        </div>

        {/* --------------- */}
        <div className="bg-slate-900 lg:block hidden lg-[300px] h-screen p-5 pt-10">
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
                  <Button className="bg-transparent flex justify-start gap-4">
                    <FileSliders /> Facility Management
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-slate-900">
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                  >
                    <DropdownMenuRadioItem value="top" className="p-0 m-1 ">
                      <NavLink
                        to="/admin/facilities-add"
                        className={({ isActive }) =>
                          `w-full py-2 px-4 rounded-lg transition-all duration-300 hover:text-black ease-in-out flex items-center gap-4  ${
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
                          `w-full py-2 px-4 rounded-lg transition-all duration-300 hover:text-black ease-in-out flex items-center gap-4 ${
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
            </div>
          ) : (
            <div className="hidden lg:block">
              <div className="text-white border-b pb-2 mb-5">
                <h3 className="font-serif text-2xl text-center uppercase">
                  gameGrounds
                </h3>
                <h3 className="font-serif text-lg text-center uppercase">
                  {user?.role} Dashboard
                </h3>
                <p className="text-center text-sm lowercase text-gray-300">
                  {user?.email}
                </p>
              </div>

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
              </div>
            </div>
          )}
        </div>

        {/* ---------- */}
        <div className="w-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
