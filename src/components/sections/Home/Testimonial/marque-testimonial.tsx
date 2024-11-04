import { cn } from "../../../../lib/utils";
import CommonHeading from "../../../shared/CommonHeading/CommonHeading";
import { Marquee } from "../../../ui/testimonial-marque";

const reviews = [
  {
    id: "1",
    name: "John Doe",
    position: "Professional Basketball Player",
    photoUrl:
      "https://images.pexels.com/photos/1819483/pexels-photo-1819483.jpeg?auto=compress&cs=tinysrgb&w=600",
    feedback:
      "Booking sports facilities through this platform has been a game-changer for my training. The process is smooth, and the facilities are top-notch!",
  },
  {
    id: "2",
    name: "Jane Smith",
    position: "Fitness Enthusiast",
    photoUrl:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    feedback:
      "I love how easy it is to book my favorite gym sessions. The user interface is intuitive, and the booking process is quick and hassle-free.",
  },
  {
    id: "3",
    name: "Michael Brown",
    position: "Local Sports Coach",
    photoUrl:
      "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=600",
    feedback:
      "This platform has significantly simplified the booking process for our team. It's incredibly efficient, and the support team is always helpful.",
  },
  {
    id: "4",
    name: "Emily Davis",
    position: "Amateur Runner",
    photoUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    feedback:
      "I appreciate the variety of facilities available for booking. The website is user-friendly, and I've never had any issues with my reservations.",
  },
  {
    id: "5",
    name: "Chris Wilson",
    position: "Gym Owner",
    photoUrl:
      "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=600",
    feedback:
      "As a facility owner, this platform has helped me manage bookings effortlessly. The integration with our existing systems was seamless, and the exposure has been great.",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  photoUrl,
  name,
  position,
  feedback,
}: {
  photoUrl: string;
  name: string;
  position: string;
  feedback: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-80 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img
          className="rounded-full size-10 object-cover"
          width="32"
          height="32"
          alt=""
          src={photoUrl}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{position}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{feedback}</blockquote>
    </figure>
  );
};

export function MarqueeTestimonial() {
  return (
    <div className="section-padding">
      <CommonHeading
        title="Client Feedback"
        subTitle="Read the stories of our delighted customers"
      />
      <div className="relative flex h-[500px py-5 w-full flex-col items-center justify-center overflow-hidden rounded-l borde bg-background md:shadow-">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </div>
  );
}
