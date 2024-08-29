const DetailsBooking = () => {
  return (
    <div className="bg-gray-100 font-sans leading-normal tracking-normal">
      <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Booking Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-700 mb-2">
              Facility Name
            </h2>
            <p className="text-gray-500">[Facility Name]</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-700 mb-2">
              Description
            </h2>
            <p className="text-gray-500">[Description]</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-700 mb-2">Location</h2>
            <p className="text-gray-500">[Location]</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-700 mb-2">Date</h2>
            <p className="text-gray-500">[Date]</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-700 mb-2">
              Start Time
            </h2>
            <p className="text-gray-500">[Start Time]</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-700 mb-2">End Time</h2>
            <p className="text-gray-500">[End Time]</p>
          </div>
        </div>

        <div className="flex justify-end">
          <a
            href="#"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            Confirm Booking
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetailsBooking;
