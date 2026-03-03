import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookCard from '../components/BookCard';
import { categories } from '../data/books';

// Category icons for visual flair
const categoryIcons = {
  Fiction: '🎭',
  'Non-Fiction': '📰',
  'Sci-Fi': '🚀',
  Mystery: '🔍',
  Biography: '👤',
  Fantasy: '🧙',
};

const HomePage = () => {
  // Get books from Redux store
  const books = useSelector((state) => state.books.list);

  // Show top 4 highest-rated books as "popular"
  const popularBooks = [...books]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div>
      {/* Hero section */}
      <section className="bg-ink text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-400 font-sans text-sm uppercase tracking-widest mb-4">
            Welcome to
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight">
            LibraVerse
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-sans font-light max-w-2xl mx-auto mb-8 leading-relaxed">
            Your online sanctuary for books. Discover timeless classics and modern masterpieces from every genre.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/books" className="btn-primary text-base px-8 py-3">
              Browse Library
            </Link>
            <Link to="/add-book" className="btn-secondary border-white text-white hover:bg-white hover:text-ink text-base px-8 py-3">
              Add a Book
            </Link>
          </div>
        </div>
      </section>

      {/* Categories section */}
      <section className="py-16 px-4 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-ink text-center mb-2">
            Browse by Category
          </h2>
          <p className="text-gray-500 text-center mb-10 font-sans">
            Explore our curated collection across genres
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/books/${category}`}
                className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="text-3xl mb-2">{categoryIcons[category] || '📚'}</div>
                <p className="font-sans font-medium text-ink text-sm group-hover:text-mahogany transition-colors">
                  {category}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Books section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl font-bold text-ink mb-1">Popular Books</h2>
              <p className="text-gray-500 font-sans">Top-rated picks from our library</p>
            </div>
            <Link
              to="/books"
              className="text-mahogany font-sans font-medium hover:underline text-sm"
            >
              View All →
            </Link>
          </div>

          {/* Book cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {popularBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 px-4 bg-mahogany text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Have a book to share?
          </h2>
          <p className="font-sans text-red-200 mb-6">
            Add your favourite books to our growing collection and help others discover great reads.
          </p>
          <Link
            to="/add-book"
            className="inline-block bg-white text-mahogany px-8 py-3 rounded font-sans font-semibold hover:bg-amber-50 transition-colors"
          >
            + Add a Book
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
