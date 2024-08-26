import {
  FileEdit,
  FilePlus,
  FileSliders,
  Home,
  ShieldPlus,
  SquareKanban,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const AdminLayout = () => {
  const [position, setPosition] = useState("bottom");

  return (
    <div className="flex">
      <div className="bg-slate-900 w-[300px] h-screen p-5">
        <div>
          {/* <AdminMobileMenu /> */}
          <div className="size-24 rounded-full overflow-hidden mx-auto">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
          </div>
          <div className="text-white border-b pb-2 mb-5">
            <h3 className="font-serif text-3xl text-center uppercase">
              Emma Watson
            </h3>
            <p className="text-center text-lg uppercase text-gray-300">Admin</p>
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
                        `w-full py-2 px-4 rounded-lg transition-all duration-300 hover:text-black ease-in-out flex items-center gap-4 ${
                          isActive
                            ? "bg-white/20 backdrop-blur-lg text-white"
                            : "text-gray-300 hover:bg-white/20 hover:backdrop-blur-lg hover:text-white"
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
                            : "text-gray-300 hover:bg-white/20 hover:backdrop-blur-lg hover:text-white"
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
              to="/booking-management"
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
        </div>
      </div>
      <div className="w-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
