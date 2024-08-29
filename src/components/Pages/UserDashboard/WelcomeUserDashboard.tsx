const WelcomeUserDashboard = () => {
  return (
    <div>
      <div className="w-full max-w-4xl mx-auto p-8 text-center bg-white shadow-lg rounded-lg mt-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard!</h1>
        <p className="text-lg text-gray-700 mb-8">
          View your sports facility bookings, check details, and manage your
          reservations with ease.
        </p>
        <div className="grid grid-cols-1 gap-6">
          <div className="p-6 bg-purple-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-purple-800 mb-2">
              Your Bookings
            </h2>
            <p className="text-gray-700 mb-4">
              Browse through your bookings, view details, or cancel any upcoming
              reservations.
            </p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded">
              View My Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeUserDashboard;
