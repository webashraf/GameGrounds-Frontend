import FeaturedFacilities from "../../sections/Home/FeaturedFacilities/FeaturedFacilities";
import Hero from "../../sections/Home/Hero/Hero";
import HowItsWork from "../../sections/Home/HowItsWork/HowItsWork";

const Home = () => {
  // const count = useAppSelector((state) => state.counter.value);
  // const dispatch = useAppDispatch();

  return (
    <div>
      <Hero />
      <div>
        <FeaturedFacilities />
        <HowItsWork />
      </div>
    </div>
  );
};

export default Home;
