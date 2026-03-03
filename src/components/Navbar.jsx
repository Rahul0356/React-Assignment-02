import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-ink text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">📚</span>
            <span className="font-serif text-xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
              LibraVerse
            </span>
          </NavLink>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors font-sans ${
                  isActive
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors font-sans ${
                  isActive
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`
              }
            >
              Browse Books
            </NavLink>
            <NavLink
              to="/add-book"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors font-sans ${
                  isActive
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`
              }
            >
              Add Book
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
