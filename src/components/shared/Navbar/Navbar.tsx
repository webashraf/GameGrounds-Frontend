/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../../ui/button";
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  // const containerX = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (context, contextSafe: any) => {
      const moveSafe = contextSafe((e: MouseEvent) => {
        gsap.to(".cm", {
          x: e.x - 950,
          y: e.y - 95,
          scale: 1,
          // cursor: "none",
          duration: 0.5,
          ease: "power2.out",
        });
      });

      const handleMouseLeave = contextSafe(() => {
        gsap.to(".cm", {
          scale: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });

      hoverRef.current?.addEventListener("mousemove", moveSafe);
      hoverRef.current?.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        hoverRef.current?.removeEventListener("mousemove", moveSafe);
        hoverRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: hoverRef }
  );
  return (
    <div>
      <div className="w-full text-white text-center border-b border-[#908a8a] py-3">
        <h2 className="font-serif text-3xl ">GameGrounds</h2>
      </div>
      <div
        ref={hoverRef}
        className="relative flex items-center justify-center w-[50%] mx-auto cursor-non"
      >
        <ul className="flex justify-center gap-10 font-mono bold text-white/80 text-xl cursor-non">
        <NavLink
            to="/"
            className="hover:underline  bg-yellow-90 p-5 cursor-non"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="hover:underline  bg-yellow-90 p-5 cursor-non"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:underline  bg-yellow-90 p-5 cursor-non"
          >
            Contact
          </NavLink>
          <NavLink
            to="/booking"
            className="hover:underline  bg-yellow-90 p-5 cursor-non"
          >
            Booking
          </NavLink>
          <NavLink
            to="/facilities"
            className="hover:underline  bg-yellow-90 p-5 cursor-non"
          >
            Facilities
          </NavLink>
          <NavLink
            to="/admin"
            className="hover:underline  bg-yellow-90 p-5 cursor-non"
          >
            Dashboard
          </NavLink>
        </ul>
        <div className="space-x-3 cursor-non">
          <NavLink to="/sign-in">
            <Button className="rounded-none h-[35px] bg-[#101010a0] backdrop-blur-md cursor-non">
              Sign In
            </Button>
          </NavLink>
          <NavLink to="/sign-up">
            <Button className="rounded-none h-[35px] bg-[#101010a0] backdrop-blur-md cursor-non">
              Sign Up
            </Button>
          </NavLink>
        </div>
        <div className="cm bg-[#ffffff01] backdrop-invert z-50 h-14 w-14 rounded-full fixed cursor-non select-none scale-[0] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Navbar;
