import FeaturedFacilities from "../../sections/Home/FeaturedFacilities/FeaturedFacilities";
import Hero from "../../sections/Home/Hero/Hero";
import HowItsWork from "../../sections/Home/HowItsWork/HowItsWork";
import { OurFields } from "../../sections/Home/OurFields/OurFields";
import Testimonial from "../../sections/Home/Testimonial/Testimonial";

const Home = () => {
  // const count = useAppSelector((state) => state.counter.value);
  // const dispatch = useAppDispatch();

  return (
    <div>
      <Hero />
      <div>
        <FeaturedFacilities />
        <HowItsWork />
        <Testimonial />
        <OurFields />
      </div>
    </div>
  );
};

export default Home;
