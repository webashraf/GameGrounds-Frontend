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
    // ScaleY animation for nav
    const scaleAnimation = gsap.to(".m-nav", {
      scaleY: 3.5,
      scrollTrigger: {
        trigger: ".m-2",
        start: "400px 200px",
        end: "800px 500px",
        scrub: 5,
        // markers: true, // Uncomment to see scroll trigger markers
      },
      ease: "power4.inOut",
    });

    // Move nav to the top when scrolling down
    const moveAnimation = gsap.to(".nav", {
      y: -60,
      scrollTrigger: {
        trigger: ".nav",
        start: "top top",
        end: "bottom top",
        scrub: 5,
      },
      ease: "power4.inOut",
    });

    return () => {
      scaleAnimation.kill();
      moveAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div
        ref={container}
        className="relative m-2 overflow-x-hidden w-full mx-auto"
      >
        <div>
          {/* Desktop Nav */}
          <div className="nav hidden lg:block fixed max-w-[2000px] w-full mx-auto top-0 left-0 right-0 z-50">
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
