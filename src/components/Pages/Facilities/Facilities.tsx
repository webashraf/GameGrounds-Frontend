import { useGetFacilitiesQuery } from "../../../Redux/api/baseApi";
import CommonHeading from "../../shared/CommonHeading/CommonHeading";

const Facilities = () => {
  const {
    data: facilities,
    error,
    isLoading,
    isFetching,
  } = useGetFacilitiesQuery(undefined);
  console.log({ facilities, error, isLoading, isFetching });

  return (
    <div className="section-padding">
      <CommonHeading
        title="Premium Facilities for Every Sport"
        subTitle="Handpicked venues for the ultimate sports experience"
      />
      <div className="grid grid-cols-3 gap-28">
        {facilities?.data?.map((item) => (
          <div
            key={item._id}
            className="group flex flex-col justify-start items-start gap-2 w-96 h-56 duration-500 relative rounded-lg p-4 bg-[#0b718b] hover:-translate-y-2 hover:shadow-xl shadow-[#0b718b] shadow-xl"
          >
            <div className="absolute duration-700 shadow-md group-hover:-translate-y-4 group-hover:-translate-x-4 -bottom-10 -right-10 w-1/2 h-1/2 rounded-lg bg-[#0b718b]"></div>

            <div className="">
              <h2 className="text-2xl font-bold mb-2 text-white font-serif">
                {item.name}
              </h2>
              <p className="text-gray-200 line-clamp-3">{item.description}</p>
            </div>
            {/* <button className="hover:bg-[#0b718b] bg-[#0b718b] text-white mt-6 rounded p-2 px-6">
                  Explore
                </button> */}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-10 mt-32">
        {facilities?.data?.map((item) => (
          <div className="group overflow-hidden bg-neutral-50 rounded-xl bg-gradient-to-tr from-cyan-800 via-cyan-700 to-cyan-500 text-gray-50 w-[300px]">
            <div className="before:duration-700 before:absolute before:w-28 before:h-28 before:bg-transparent before:blur-none before:border-8 before:opacity-50 before:rounded-full before:-left-4 before:-top-12 w-full h-56  flex flex-col justify-between relative z-10 group-hover:before:top-28 group-hover:before:left-56 group-hover:before:scale-125 group-hover:before:blur">
              <div className="text p-3 flex flex-col justify-evenly h-full w-full">
                <span className="font-bold text-2xl font-serif">
                  {item.name}
                </span>
                <p className="text-gray-300">{item.description}</p>
              </div>
              <div className="w-full flex flex-row justify-between z-10">
                {/* <a
                      className="hover:opacity-90 py-3 bg-cyan-50 w-full flex justify-center"
                      href="#"
                    >
                      <svg
                        y="0"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0"
                        width="100"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid meet"
                        height="100"
                        className="w-6 h-6  stroke-cyan-800"
                      >
                        <path
                          stroke-width="8"
                          stroke-linejoin="round"
                          stroke-linecap="round"
                          fill="none"
                          d="M18.3,65.8v4A11.9,11.9,0,0,0,30.2,81.7H69.8A11.9,11.9,0,0,0,81.7,69.8v-4M65.8,50,50,65.8m0,0L34.2,50M50,65.8V18.3"
                          className=""
                        ></path>
                      </svg>
                    </a> */}
                {/* <a
                      className="hover:opacity-90 py-3 bg-cyan-50 w-full flex justify-center"
                      href="#"
                    >
                      <svg
                        y="0"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0"
                        width="100"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid meet"
                        height="100"
                        className="w-6 h-6  stroke-cyan-800"
                      >
                        <path
                          stroke-width="8"
                          stroke-linejoin="round"
                          stroke-linecap="round"
                          fill="none"
                          d="M21.9,50h0M50,50h0m28.1,0h0M25.9,50a4,4,0,1,1-4-4A4,4,0,0,1,25.9,50ZM54,50a4,4,0,1,1-4-4A4,4,0,0,1,54,50Zm28.1,0a4,4,0,1,1-4-4A4,4,0,0,1,82.1,50Z"
                        ></path>
                      </svg>
                    </a> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
