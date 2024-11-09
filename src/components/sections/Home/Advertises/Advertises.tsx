import { NavLink } from "react-router-dom";
import { Button } from "../../../ui/button";
import { BackgroundBeams } from "./BackgroundBeams";

export function AdvertiseMent() {
  return (
    <div className="h-[40rem] w-full rounded-m bg-neutral-950 relative flex flex-col items-center justify-center antialiased mt-20">
      <div className="max-w-2xl mx-auto p-4 flex flex-col items-center justify-center relative z-50">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Pre-Book Your Field Today!
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Lock in our best fields at unbeatable rates! Whether it's a quick game
          or a full tournament, enjoy top facilities without breaking the bank.
          Secure your spot now!
        </p>
        <NavLink to="/facilities" className="">
          <Button className="uppercase rounded-none px-10 md:px-20 h-[40px] md:h-[50px] mt-5 text-base md:text-lg bg-[#10101090] backdrop-blur-md">
            Book Now
          </Button>
        </NavLink>
      </div>
      <BackgroundBeams />
    </div>
  );
}
