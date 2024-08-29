const UnAuthorizedUser = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="text-center p-8 max-w-md mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight text-red-500">
          403
        </h1>
        <h2 className="mt-4 text-2xl font-semibold">Access Denied</h2>
        <p className="mt-2 text-gray-400">
          You don't have permission to view this page.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-red-500 text-lg font-medium rounded-full hover:bg-red-600 transition duration-300"
        >
          Back to Home
        </a>
        <div className="mt-10">
          <img
            src="https://via.placeholder.com/300x200"
            alt="Unauthorized Access"
            className="w-full h-auto mx-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default UnAuthorizedUser;
