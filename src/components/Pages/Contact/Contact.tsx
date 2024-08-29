/* eslint-disable @typescript-eslint/no-explicit-any */
import GoogleMapReact from "google-map-react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import CommonHero from "../../shared/CommonHero/CommonHero";
import { Button } from "../../ui/button";

// Define the interface for form data
type TContactFormData = {
  name: string;
  email: string;
  message: string;
};
type TDefaultProps = {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
};

// Define the props for the map marker component
type TMapMarkerProps =
  | {
      text: string;
    }
  | any;

// Map marker component
const AnyReactComponent = ({ text }: TMapMarkerProps) => <div>{text}</div>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TContactFormData>();

  const onSubmit: SubmitHandler<TContactFormData> = async (data) => {
    console.log(data);
  };

  const defaultProps: TDefaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <div className="mx-auto ">
      <CommonHero title="Contact Us" />

      <div className="p-10">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 text-center">
          <h2 className="text-5xl font-serif text-gray-800 mb-8">
            Get in Touch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <MapPin className="text-[#0b718b] mb-4" size={48} />
              <h3 className="font-semibold text-xl text-gray-700">Location</h3>
              <p className="text-gray-600">1234 Street Name, City, Country</p>
            </div>

            <div className="flex flex-col items-center">
              <Mail className="text-[#0b718b] mb-4" size={48} />
              <h3 className="font-semibold text-xl text-gray-700">Email</h3>
              <p className="text-gray-600">contact@example.com</p>
            </div>

            <div className="flex flex-col items-center">
              <Phone className="text-[#0b718b] mb-4" size={48} />
              <h3 className="font-semibold text-xl text-gray-700">Phone</h3>
              <p className="text-gray-600">+123 456 7890</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-full md:w-1/2 bg-black ">
          <div className="h-[60vh] rounded-lg overflow-hidden">
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4  bg-white p-5 w-full rounded-lg shadow-xl"
          >
            <div className="w-full p-3 rounded-lg bg-gray-100">
              <label
                className="block text-gray-700 text-xl font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                placeholder="Name"
                {...register("name", {
                  required: "Name is required",
                })}
                className="text-md w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                type="text"
                id="name"
                name="name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="w-full p-3 rounded-lg bg-gray-100">
              <label
                className="block text-gray-700 text-xl font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="text-md w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                placeholder="Your email"
                type="text"
                id="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="w-full p-3 rounded-lg bg-gray-100">
              <label
                className="block text-gray-700 text-xl font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                {...register("message", {
                  required: "Message is required",
                })}
                className="text-md w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                placeholder="Your message..."
                id="message"
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>

            <Button type="submit" className="uppercase text-lg mt-3">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
