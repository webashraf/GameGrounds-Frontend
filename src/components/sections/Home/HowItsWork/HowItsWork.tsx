import React from "react";
import { Chrono } from "react-chrono";
import heroImg1 from "../../../../assets/hero/aerial-view-grass-field-hockey_23-2149668573.jpg";
import CommonHeading from "../../../shared/CommonHeading/CommonHeading";
import "./HowItsWork.css";

const HowItsWork: React.FC = () => {
  const items = [
    {
      title: "Step 1: Choose Your Facility",
      cardTitle: "Select a Sports Facility",
      cardSubtitle: "Browse through our list of available sports facilities.",
      cardDetailedText:
        "Explore our diverse range of sports facilities, from tennis courts to swimming pools. Use our search filters to find the facility that best suits your needs and preferences.",
    },
    {
      title: "Step 2: Check Availability",
      cardTitle: "View Availability",
      cardSubtitle: "Check the availability of your chosen facility.",
      cardDetailedText:
        "Select your desired date and time to see the available slots. Our real-time calendar will help you quickly find an open slot that fits your schedule.",
    },
    {
      title: "Step 3: Make a Reservation",
      cardTitle: "Book Your Slot",
      cardSubtitle: "Reserve your chosen time slot.",
      cardDetailedText:
        "Fill out the booking form with your details and confirm your reservation. You can review your booking details before finalizing the reservation to ensure everything is correct.",
    },
    {
      title: "Step 4: Receive Confirmation",
      cardTitle: "Get Confirmation",
      cardSubtitle: "Receive a booking confirmation email.",
      cardDetailedText:
        "Once your booking is confirmed, you'll receive an email with all the details of your reservation. This email will include the facility address, time slot, and any additional instructions.",
    },
    {
      title: "Step 5: Enjoy Your Time",
      cardTitle: "Use the Facility",
      cardSubtitle: "Arrive and enjoy your booked time.",
      cardDetailedText:
        "Arrive at the facility on time and enjoy your reserved sports activity. Make sure to bring any required equipment and follow the facility's rules and guidelines.",
    },
  ];

  return (
    <div className="section-padding">
      <CommonHeading
        title="Simplified Booking Journey"
        subTitle="Understand the process of booking sports facilities in just a few clicks."
      />
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2">
          <img
            src={heroImg1}
            className="w-full h-full object-cover rounded-md"
            alt="Sports facility"
          />
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
              primary: "black", // Primary color for the component
              secondary: "white", // Secondary color for the component
              cardBgColor: "white", // Background color of the card
              titleColor: "black", // Color of the titles
              titleColorActive: "black", // Color of the active titles
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
