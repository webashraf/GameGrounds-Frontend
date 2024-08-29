import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../shared/Footer/Footer";
import MobileNav from "../../shared/MobileNav/MobileNav";
import Navbar from "../../shared/Navbar/Navbar";

gsap.registerPlugin(ScrollTrigger);

const MainLayout = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Animation for scaling Y-axis of the nav
    const scaleAnimation = gsap.to(".m-nav", {
      scaleY: 3.5,
      scrollTrigger: {
        trigger: ".m-2",
        start: "400px 200px",
        end: "800px 500px",
        scrub: 5,
      },
      ease: "power4.inOut",
    });

    // Animation for moving nav upwards when scrolling down
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

    // Cleanup animations on component unmount
    return () => {
      scaleAnimation.kill();
      moveAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="max-w-full lg:max-w-[1920px] mx-auto w-full">
      {/* Responsive wrapper with maximum width for larger screens */}
      <div ref={container} className="relative overflow-x-hidden">
        <div>
          {/* Desktop Navbar */}
          <div className="nav hidden lg:block fixed w-full lg:w-[1920px] mx-auto top-0 left-0 right-0 z-50">
            <div className="m-nav w-full h-[60px] absolute bg-[#00000084] backdrop-blur-lg -z-20"></div>
            <Navbar />
          </div>
        </div>
        {/* Mobile Navbar */}
        <div className="lg:hidden md:block fixed bottom-5 left-0 right-0 z-50">
          <MobileNav />
        </div>
        {/* Main Content */}
        <div className="m-2 mx-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
