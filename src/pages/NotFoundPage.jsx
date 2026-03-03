import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFoundPage = () => {
  // Get the current invalid URL to display it
  const location = useLocation();

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Large 404 */}
        <p className="font-serif text-[10rem] font-bold text-amber-500 leading-none select-none">
          404
        </p>

        <h1 className="font-serif text-3xl font-bold text-white mb-4">
          Page Not Found
        </h1>

        {/* Display the invalid route URL */}
        <p className="text-gray-400 font-sans mb-2">
          The page you were looking for does not exist:
        </p>
        <div className="bg-gray-800 rounded-lg px-4 py-2 mb-6 inline-block">
          <code className="text-amber-400 text-sm font-mono break-all">
            {location.pathname}
          </code>
        </div>

        <p className="text-gray-500 font-sans mb-8">
          It may have been moved, deleted, or you may have mistyped the URL.
        </p>

        {/* Link back to Home */}
        <Link
          to="/"
          className="inline-block bg-amber-500 hover:bg-amber-400 text-ink font-sans font-semibold px-8 py-3 rounded transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
