import { AdvertiseMent } from "../../sections/Home/Advertises/Advertises";
import FeaturedFacilities from "../../sections/Home/FeaturedFacilities/FeaturedFacilities";
import Hero from "../../sections/Home/Hero/Hero";
import { HeroParallaxGallery } from "../../sections/Home/HeroParallaxGallery/HeroParallaxGallery";
import HowItsWork from "../../sections/Home/HowItsWork/HowItsWork";

import OurFields from "../../sections/Home/OurFields/OurFields";
import { SocialLink } from "../../sections/Home/SocialLink/SocialLink";
import Testimonial from "../../sections/Home/Testimonial/Testimonial";

const Home = () => {

  return (
    <>
      <Hero />
      <div className="lg:px-20 px-5">
        <FeaturedFacilities />
        <HowItsWork />
        <Testimonial />
        <OurFields />
        <HeroParallaxGallery />
        <AdvertiseMent />
        <SocialLink />
      </div>
    </>
  );
};

export default Home;
