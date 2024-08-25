import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer/Footer";
import MobileNav from "../shared/MobileNav/MobileNav";
import Navbar from "../shared/Navbar/Navbar";
gsap.registerPlugin(ScrollTrigger);

const MainLayout = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animation = gsap.to(".m-nav", {
      scaleY: 3.5,
      scrollTrigger: {
        trigger: ".m-2",
        start: "400px 200px",
        end: "800px 500px",
        scrub: 5,
        // markers: true,
      },
      ease: "power4.inOut",
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div
        ref={container}
        className="relative m-2 overflow-x-hidden max-w-[2000px] w-full mx-auto"
      >
        <div>
          {/* Desktop Nav */}
          <div className="hidden lg:block fixed max-w-[2000px] w-full mx-auto top-0 left-0 right-0 z-50">
            <div className="m-nav w-full h-[60px] absolute bg-[#00000084] backdrop-blur-lg -z-20"></div>
            <Navbar />
          </div>
        </div>
        {/* Mobile nav */}
        <div className="lg:hidden md:block fixed bottom-5 left-0 right-0 z-50">
          <MobileNav />
        </div>
        {/* Body */}
        <div className="">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
