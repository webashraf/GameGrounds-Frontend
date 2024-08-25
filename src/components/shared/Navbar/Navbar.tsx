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
          x: e.clientX - 1050,
          y: e.clientY - 100,
          scale: 1,
          cursor: "none",
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
        className="relative flex items-center justify-center w-[50%] mx-auto cursor-none"
      >
        <ul className="flex justify-center gap-10 font-mono bold text-white/80 text-xl cursor-none">
          <NavLink
            to="/"
            className="hover:underline  bg-yellow-90 p-5 cursor-none"
          >
            Home
          </NavLink>
          <NavLink
            to="/"
            className="hover:underline  bg-yellow-90 p-5 cursor-none"
          >
            About
          </NavLink>
          <NavLink
            to="/"
            className="hover:underline  bg-yellow-90 p-5 cursor-none"
          >
            Contact
          </NavLink>
          <NavLink
            to="/"
            className="hover:underline  bg-yellow-90 p-5 cursor-none"
          >
            Blogs
          </NavLink>
        </ul>
        <div className="space-x-3 cursor-none">
          <Button className="rounded-none h-[35px] bg-[#101010a0] backdrop-blur-md cursor-none">
            Sign In
          </Button>
          <Button className="rounded-none h-[35px] bg-[#101010a0] backdrop-blur-md cursor-none">
            Sign Up
          </Button>
        </div>
        <div className="cm bg-[#ffffff01] backdrop-invert z-50 h-14 w-14 rounded-full fixed cursor-none select-none scale-[0]"></div>
      </div>
    </div>
  );
};

export default Navbar;
