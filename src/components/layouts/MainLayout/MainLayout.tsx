import gsap from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all"; // Import ScrollToPlugin
import { ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../shared/Footer/Footer";
import MobileNav from "../../shared/MobileNav/MobileNav";
import Navbar from "../../shared/Navbar/Navbar";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin); // Register ScrollTrigger and ScrollToPlugin

const MainLayout = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Toggle scroll button visibility based on scroll position
    const onScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    // Nav bar animations
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

    const moveAnimation = gsap.to(".nav", {
      y: -60,
      scrollTrigger: {
        trigger: ".nav",
        start: "400px 200px",
        end: "800px 500px",
        scrub: 5,
      },
      ease: "power4.inOut",
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      scaleAnimation.kill();
      moveAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 1,
      ease: "power4.inOut",
    });
  };

  return (
    <div className="max-w-full lg:max-w-[1920px] mx-auto w-full">
      <div ref={container} className="relative overflow-x-hidden">
        {/* Desktop Navbar */}
        <div className="nav hidden lg:block fixed w-full lg:w-[1920px] mx-auto top-0 left-0 right-0 z-50">
          <div className="m-nav w-full h-[60px] absolute bg-[#00000084] backdrop-blur-lg -z-20"></div>
          <Navbar />
        </div>
        {/* Mobile Navbar */}
        <div className="lg:hidden md:block fixed bottom-5 left-0 right-0 z-50">
          <MobileNav />
        </div>
        {/* Main Content */}
        <div className="lg:m-2 mx-auto">
          <Outlet />
        </div>
        <Footer />

        {/* Scroll to Top Button */}
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-5 right-10 hover:animate-bounce bg-black/30 backdrop-blur-md text-white p-3 rounded-full shadow-lg z-50"
          >
            <ChevronUp />
          </button>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
