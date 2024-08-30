import img1 from "../../../assets/hero/pexels-johnsully-15203.jpg";
import CommonHeading from "../../shared/CommonHeading/CommonHeading";
import CommonHero from "../../shared/CommonHero/CommonHero";

const About = () => {
  return (
    <div className="">
      <CommonHero title="about us" />

      <div className="lg:px-20 px-5">
        <div className="relative  text-white black/30 backdrop-blur-sm  py-16 px-4 sm:px-8 rounded-lg shadow-lg overflow-hidden">
          <div
            className="absolute inset-0  mix-blend-multiply bg-fixed"
            style={{
              backgroundImage: `url(${img1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg leading-relaxed">
              We aim to revolutionize the way sports facilities are booked by
              creating an intuitive, user-friendly platform that enhances
              accessibility for all. Our commitment is to empower communities to
              embrace healthy and active lifestyles, making sports enjoyable and
              accessible to everyone.
            </p>
          </div>
          <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-full shadow-md">
              <span className="block">Accessibility</span>
            </div>
            <div className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-full shadow-md">
              <span className="block">Convenience</span>
            </div>
            <div className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-full shadow-md">
              <span className="block">Community</span>
            </div>
          </div>
        </div>
        {/* Our mission */}
        <div className="mb-16 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                About the Platform
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                The Sports Facility Booking Platform is a comprehensive solution
                designed to simplify the process of reserving sports facilities.
                Whether you're an individual looking to book a local court or an
                organization managing a large sports complex, our platform
                provides the tools and flexibility needed to ensure a seamless
                booking experience. With real-time availability, secure
                payments, and easy-to-use scheduling, we aim to make sports more
                accessible and enjoyable for everyone.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src={img1}
                alt="Platform"
                className="w-full sm:w-3/4 md:w-1/2 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
        {/* Our team */}
        <div className="mb-16 py-8">
          <CommonHeading
            title="Our Dedicated Professionals"
            subTitle="Get to know the talented individuals behind our success."
          />
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="max-w-xs text-center">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                />
                <h3 className="text-lg sm:text-xl font-semibold">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500">{member.position}</p>
                <p className="text-gray-600 mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Our goals */}
        <div className="mb-8 py-8">
          <CommonHeading
            title="Milestones and Achievements"
            subTitle="A look back at our key moments and successes"
          />
          <div className="relative w-full lg:w-2/4 mx-auto">
            <div className="absolute border-l-2 border-blue-500 h-full left-1/2 transform -translate-x-1/2"></div>
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex flex-col items-center mb-4 ${
                  index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <div className="bg-white shadow-md rounded-lg p-4 lg:max-w-sm w-full text-center lg:text-left transform transition-transform duration-300 hover:scale-105">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1 flex items-center justify-center lg:justify-start">
                    <span className="mr-1 text-blue-500 text-2xl sm:text-3xl">
                      {milestone.icon}
                    </span>
                    {milestone.title}
                  </h3>
                  <p className="text-gray-700 text-sm lg:text-base">
                    {milestone.description}
                  </p>
                  <span className="block mt-1 text-xs lg:text-sm text-gray-500">
                    {milestone.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Contact */}
        <div className="bg-gray-100 py-8 rounded-lg shadow-md">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
            Contact Us
          </h2>
          <div className="flex flex-col items-center">
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              <strong>Office:</strong> 123 Sports Facility St, City, Country
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              <strong>Phone:</strong> +123 456 7890
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              <strong>Email:</strong> info@sportsfacility.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const teamMembers = [
  {
    name: "John Doe",
    position: "Founder & CEO",
    bio: "John is passionate about sports and technology...",
    photo:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Jane Smith",
    position: "CTO",
    bio: "Jane leads the technical team with a focus on innovation...",
    photo:
      "https://images.pexels.com/photos/1819483/pexels-photo-1819483.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const milestones = [
  {
    title: "Founded",
    description:
      "Our journey began in 2020 with a mission to revolutionize sports facility booking.",
    date: "2020",
    icon: "🏅",
  },
  {
    title: "First 1000 Users",
    description:
      "In 2021, we reached our first 1000 users, marking a significant milestone in our growth.",
    date: "2021",
    icon: "🎉",
  },
  {
    title: "Partnership with Major Sports Brands",
    description:
      "In 2022, we partnered with several leading sports brands to enhance our offerings.",
    date: "2022",
    icon: "🤝",
  },
  {
    title: "Expansion to International Markets",
    description:
      "By 2023, we expanded our services to international markets, making a global impact.",
    date: "2023",
    icon: "🌍",
  },
  {
    title: "Award for Innovation",
    description:
      "In 2024, we were honored with a prestigious award for innovation in the sports industry.",
    date: "2024",
    icon: "🏆",
  },
];

export default About;
