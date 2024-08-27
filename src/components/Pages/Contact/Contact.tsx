/* eslint-disable @typescript-eslint/no-explicit-any */
import GoogleMapReact from "google-map-react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import CommonHero from "../../shared/CommonHero/CommonHero";
import { Button } from "../../ui/button";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm<any>();
  const onSubmit: SubmitHandler<any> = async (data) => {
    const updatedData = {
      name: data.name,
      description: data.description,
      location: data.location,
      pricePerHour: Number(data.pricePerHour),
    };
    console.log(updatedData);
    reset();
    console.log(updatedData, data._id);

    // try {
    //   const res = await updateFacilities({
    //     _id: data._id,
    //     data: updatedData,
    //   }).unwrap();

    //   console.log(res);
    //   if (res?.success) {
    //     toast.success(res?.message);
    //   }
    //   if (res?.error) {
    //     toast.error(
    //       res?.error?.message ? res?.error?.message : "Facility failed to add!"
    //     );
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  return (
    <div className=" mx-auto">
      <CommonHero title="about us" />

      <div className=" p-10">
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
      <div className="flex  items-end justify-center gap-x-5">
        <div className="w-1/2">
          <div
            className="mt-20 rounded-lg overflow-hidden "
            style={{ height: "40vh", width: "100%" }}
          >
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

        <div className="w-1/2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap- h-[40vh] bg-white  p-5 w-full rounded-lg shadow-xl"
          >
            <div className="w-full p-3 rounded-lg font-mono bg-blac">
              <label
                className="block text-gray-700 text-xl font-bold mb-2"
                htmlFor="unique-input"
              >
                Name
              </label>
              <input
                placeholder="Name"
                {...register("name", {
                  required: true,
                })}
                className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                type="text"
                id="unique-input"
                name="name"
              />
            </div>
            <div className="w-full p-3 rounded-lg font-mono bg-blac">
              <label
                className="block text-gray-700 text-xl font-bold mb-2"
                htmlFor="unique-input"
              >
                Email
              </label>
              <input
                {...register("email", {
                  required: true,
                })}
                className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                placeholder="Your mail"
                type="text"
                id="unique-input"
              />
            </div>

            <div className="w-full p-3 rounded-lg font-mono bg-blac">
              <label
                className="block text-gray-700 text-xl font-bold mb-2"
                htmlFor="unique-input"
              >
                Message
              </label>
              <textarea
                {...register("message", {
                  required: true,
                })}
                className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                placeholder="Your message..."
                id="unique-input"
              />
            </div>

            {errors.exampleRequired && <span>This field is required</span>}

            {/* <input type="submit"  /> */}
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
