import React from 'react';
import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookCard from '../components/BookCard';
import { categories } from '../data/books';

const BrowseBooksPage = () => {
  // Get category from URL param (e.g., /books/:category)
  const { category } = useParams();
  const navigate = useNavigate();

  // Get books from Redux store
  const books = useSelector((state) => state.books.list);

  // Local state for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter books based on active category and search query
  const filteredBooks = useMemo(() => {
    let result = books;

    // Filter by category if one is selected
    if (category) {
      result = result.filter(
        (book) => book.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search query (title or author)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q)
      );
    }

    return result;
  }, [books, category, searchQuery]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Page header */}
      <div className="bg-ink text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-4xl font-bold mb-2">
            {category ? `${category} Books` : 'Browse All Books'}
          </h1>
          <p className="text-gray-300 font-sans">
            {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Search bar */}
        <div className="mb-6 max-w-md">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or author..."
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            to="/books"
            className={`px-4 py-1.5 rounded-full text-sm font-medium font-sans transition-colors ${
              !category
                ? 'bg-mahogany text-white'
                : 'bg-white border border-gray-300 text-gray-600 hover:bg-parchment'
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/books/${cat}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium font-sans transition-colors ${
                category === cat
                  ? 'bg-mahogany text-white'
                  : 'bg-white border border-gray-300 text-gray-600 hover:bg-parchment'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Books grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📭</p>
            <h3 className="font-serif text-2xl font-semibold text-ink mb-2">No books found</h3>
            <p className="text-gray-500 font-sans mb-6">
              {searchQuery
                ? `No results for "${searchQuery}". Try a different search.`
                : 'No books in this category yet.'}
            </p>
            <button
              onClick={() => { setSearchQuery(''); navigate('/books'); }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseBooksPage;
