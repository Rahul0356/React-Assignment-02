import { Link } from 'react-router-dom';

// Renders star rating display
const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="text-amber-500 text-sm">
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(5 - full - (half ? 1 : 0))}
      <span className="text-gray-500 ml-1 text-xs">{rating}</span>
    </span>
  );
};

const BookCard = ({ book }) => {
  return (
    <div className="card flex flex-col h-full">
      {/* Cover image */}
      <div className="h-52 overflow-hidden bg-gray-100">
        <img
          src={book.cover}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.style.display = 'none';
            e.target.parentNode.classList.add('flex', 'items-center', 'justify-center');
            e.target.parentNode.innerHTML = '<span class="text-5xl">📖</span>';
          }}
        />
      </div>

      {/* Card content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category badge */}
        <span className="inline-block bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded-full mb-2 self-start font-sans">
          {book.category}
        </span>

        <h3 className="font-serif text-lg font-semibold text-ink mb-1 line-clamp-2 leading-tight">
          {book.title}
        </h3>
        <p className="text-gray-500 text-sm mb-2 font-sans">by {book.author}</p>
        <StarRating rating={book.rating} />

        {/* Description preview */}
        <p className="text-gray-600 text-sm mt-2 line-clamp-2 flex-1 font-sans leading-relaxed">
          {book.description}
        </p>

        {/* View details link */}
        <Link
          to={`/books/${book.category}/${book.id}`}
          className="mt-4 btn-primary text-center text-sm block"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
