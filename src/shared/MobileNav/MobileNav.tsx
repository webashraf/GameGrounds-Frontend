import { Home } from "lucide-react";
import "./MobileNav.css";

const MobileNav = () => {
  return (
    <div className="w-[90%] mx-auto rounded-2xl flex justify-center py-5 bg-white/30 backdrop-blur-lg shadow-2xl border border-white/20">
      <div className="w-full px-3">
        <div className="flex flex-col ">
          <div className="text-center mb-  font-semibold font-serif text-3xl">
            GameGrounds
          </div>
          <div className="border border-gray-300 py-3 flex gap-1 shadow-xl rounded-md w-full justify-center">
            <div className="group relative px-4 cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
                <Home />
              </div>
              <p>Home</p>
              <span className="absolute -top-8 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                Home
              </span>
            </div>
            <div className="group relative px-4 cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
                <Home />
              </div>
              <p>Home</p>
              <span className="absolute -top-8 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                Home
              </span>
            </div>
            <div className="group relative px-4 cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
                <Home />
              </div>
              <p>Home</p>
              <span className="absolute -top-8 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                Home
              </span>
            </div>
            <div className="group relative px-4 cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
                <Home />
              </div>
              <p>Home</p>
              <span className="absolute -top-8 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                Home
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
