/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  // const containerX = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (context, contextSafe: any) => {
      const moveSafe = contextSafe((e: MouseEvent) => {
        gsap.to(".cm", {
          x: e.clientX - 770,
          y: e.clientY - 160,
          scale: 1,
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
      <div ref={hoverRef} className="relative w-[30%] mx-auto">
        <ul className="flex justify-center gap-10 font-mono bold text-white/8 text-xl bg-green-40  mx-auto">
          <NavLink to="/" className="hover:underline  bg-yellow-90 p-5">
            Home
          </NavLink>
          <NavLink to="/" className="hover:underline  bg-yellow-90 p-5">
            About
          </NavLink>
          <NavLink to="/" className="hover:underline  bg-yellow-90 p-5">
            Contact
          </NavLink>
          <NavLink to="/" className="hover:underline  bg-yellow-90 p-5">
            Blogs
          </NavLink>
        </ul>
        <div className="cm bg-[#ffffff01] backdrop-invert z-50 h-14 w-14 rounded-full fixed cursor-none select-none scale-[0]"></div>
      </div>
    </div>
  );
};

export default Navbar;
