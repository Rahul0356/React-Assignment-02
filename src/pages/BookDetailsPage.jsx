import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Star rating with full display
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-2xl ${
              star <= Math.round(rating) ? 'text-amber-500' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="font-sans font-semibold text-gray-700 text-lg">{rating} / 5</span>
    </div>
  );
};

const BookDetailsPage = () => {
  // Get book id and category from URL params
  const { id, category } = useParams();
  const navigate = useNavigate();

  // Find the book in the Redux store by id
  const book = useSelector((state) =>
    state.books.list.find((b) => b.id === parseInt(id))
  );

  // If book not found, show error message
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <p className="text-5xl mb-4">📕</p>
          <h2 className="font-serif text-3xl font-bold text-ink mb-4">Book Not Found</h2>
          <p className="text-gray-500 font-sans mb-6">
            The book you're looking for doesn't exist in our library.
          </p>
          <Link to="/books" className="btn-primary">
            Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="bg-parchment border-b border-amber-200 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-sm font-sans text-gray-500">
          <Link to="/" className="hover:text-mahogany transition-colors">Home</Link>
          <span>›</span>
          <Link to="/books" className="hover:text-mahogany transition-colors">Browse</Link>
          {category && (
            <>
              <span>›</span>
              <Link to={`/books/${category}`} className="hover:text-mahogany transition-colors">
                {category}
              </Link>
            </>
          )}
          <span>›</span>
          <span className="text-ink font-medium truncate max-w-xs">{book.title}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Book cover */}
            <div className="md:w-72 shrink-0 bg-gray-100">
              <img
                src={book.cover}
                alt={`Cover of ${book.title}`}
                className="w-full h-72 md:h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.classList.add('flex', 'items-center', 'justify-center');
                  e.target.parentNode.innerHTML = '<span class="text-8xl">📖</span>';
                }}
              />
            </div>

            {/* Book info */}
            <div className="p-8 flex-1">
              {/* Category badge */}
              <span className="inline-block bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full mb-4 font-sans">
                {book.category}
              </span>

              {/* Title & Author */}
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-2 leading-tight">
                {book.title}
              </h1>
              <p className="text-gray-500 text-lg font-sans mb-4">
                by <span className="font-semibold text-gray-700">{book.author}</span>
              </p>

              {/* Rating */}
              <div className="mb-5">
                <StarRating rating={book.rating} />
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-6 mb-6 text-sm font-sans">
                {book.year && (
                  <div>
                    <p className="text-gray-400 uppercase tracking-wide text-xs mb-1">Published</p>
                    <p className="font-medium text-ink">{book.year}</p>
                  </div>
                )}
                {book.pages && (
                  <div>
                    <p className="text-gray-400 uppercase tracking-wide text-xs mb-1">Pages</p>
                    <p className="font-medium text-ink">{book.pages}</p>
                  </div>
                )}
              </div>

              {/* Divider */}
              <hr className="border-parchment mb-5" />

              {/* Description */}
              <h2 className="font-serif text-lg font-semibold text-ink mb-3">Description</h2>
              <p className="text-gray-600 font-sans leading-relaxed text-base mb-8">
                {book.description}
              </p>

              {/* Back to Browse button */}
              <button
                onClick={() => navigate(-1)}
                className="btn-secondary"
              >
                ← Back to Browse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
