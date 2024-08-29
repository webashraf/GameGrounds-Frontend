const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="text-center p-8 max-w-md mx-auto">
        <h1 className="text-7xl font-extrabold tracking-tight text-green-500">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold">Oops! Page Not Found</h2>
        <p className="mt-2 text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-green-500 text-lg font-medium rounded-full hover:bg-green-600 transition duration-300"
        >
          Back to Home
        </a>

      </div>
    </div>
  );
};

export default ErrorPage;
