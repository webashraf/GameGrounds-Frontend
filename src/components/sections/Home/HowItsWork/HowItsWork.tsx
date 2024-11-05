import { Chrono } from "react-chrono";

import CommonHeading from "../../../shared/CommonHeading/CommonHeading";
import { ImagesSlider } from "../../../ui/image-carousel-generator";
import { images, items } from "./HowItsWork.const";
import "./HowItsWork.css";

const HowItsWork = () => {
  return (
    <div className="section-padding">
      <CommonHeading
        title="Simplified Booking Journey"
        subTitle="Understand the process of booking sports facilities in just a few clicks."
      />
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 lg:h-[70vh]">
          <ImagesSlider className="h-[40rem]" images={images}></ImagesSlider>
        </div>
        <div className="w-full lg:w-1/2 h-auto lg:h-[70vh] shadow-xl">
          <Chrono
            items={items}
            mode="VERTICAL_ALTERNATING"
            scrollable={{ scrollbar: true }}
            buttonTexts={{
              first: "Jump to First",
              last: "Jump to Last",
              next: "Next",
              previous: "Previous",
            }}
            slideShow
            slideItemDuration={4500}
            slideShowType="reveal"
            theme={{
              primary: "black",
              secondary: "white",
              cardBgColor: "white",
              titleColor: "black",
              titleColorActive: "black",
            }}
            fontSizes={{
              cardSubtitle: "0.85rem",
              cardText: "0.8rem",
              cardTitle: "1.5rem",
              title: "1rem",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HowItsWork;
