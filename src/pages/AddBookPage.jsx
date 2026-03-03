import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../store/booksSlice';
import { categories } from '../data/books';

// Initial empty form state
const emptyForm = {
  title: '',
  author: '',
  category: '',
  description: '',
  rating: '',
  year: '',
  pages: '',
  cover: '',
};

const AddBookPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState(emptyForm);

  // Validation errors state
  const [errors, setErrors] = useState({});

  // Track if form was submitted (to show errors)
  const [submitted, setSubmitted] = useState(false);

  // Handle input change - update field and clear its error
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate all required fields and return errors object
  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required.';
    if (!formData.author.trim()) newErrors.author = 'Author is required.';
    if (!formData.category) newErrors.category = 'Please select a category.';
    if (!formData.description.trim()) newErrors.description = 'Description is required.';
    else if (formData.description.trim().length < 20)
      newErrors.description = 'Description must be at least 20 characters.';

    if (!formData.rating) {
      newErrors.rating = 'Rating is required.';
    } else {
      const r = parseFloat(formData.rating);
      if (isNaN(r) || r < 1 || r > 5) newErrors.rating = 'Rating must be between 1 and 5.';
    }

    if (formData.year) {
      const y = parseInt(formData.year);
      if (isNaN(y) || y < 1000 || y > new Date().getFullYear())
        newErrors.year = 'Enter a valid year.';
    }

    if (formData.pages) {
      const p = parseInt(formData.pages);
      if (isNaN(p) || p < 1) newErrors.pages = 'Enter a valid page count.';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Build new book object with unique ID
    const newBook = {
      id: Date.now(), // Use timestamp as unique id
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category,
      description: formData.description.trim(),
      rating: parseFloat(parseFloat(formData.rating).toFixed(1)),
      year: formData.year ? parseInt(formData.year) : null,
      pages: formData.pages ? parseInt(formData.pages) : null,
      cover: formData.cover.trim() || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
    };

    // Dispatch addBook action to Redux store (adds to front of list)
    dispatch(addBook(newBook));

    // Redirect to Browse Books page
    navigate('/books');
  };

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-ink mb-2">Add a New Book</h1>
          <p className="text-gray-500 font-sans">
            Share your favourite book with the LibraVerse community.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl shadow-md p-8 space-y-5">

          {/* Title */}
          <div>
            <label htmlFor="title" className="label">
              Book Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. The Alchemist"
              className={`input-field ${errors.title ? 'border-red-400' : ''}`}
            />
            {errors.title && <p className="error-text">{errors.title}</p>}
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="label">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              id="author"
              name="author"
              type="text"
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g. Paulo Coelho"
              className={`input-field ${errors.author ? 'border-red-400' : ''}`}
            />
            {errors.author && <p className="error-text">{errors.author}</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="label">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`input-field ${errors.category ? 'border-red-400' : ''}`}
            >
              <option value="">Select a category...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="error-text">{errors.category}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="label">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Brief description of the book..."
              className={`input-field resize-none ${errors.description ? 'border-red-400' : ''}`}
            />
            {errors.description && <p className="error-text">{errors.description}</p>}
          </div>

          {/* Rating, Year, Pages - 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="rating" className="label">
                Rating (1–5) <span className="text-red-500">*</span>
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                placeholder="e.g. 4.5"
                className={`input-field ${errors.rating ? 'border-red-400' : ''}`}
              />
              {errors.rating && <p className="error-text">{errors.rating}</p>}
            </div>

            <div>
              <label htmlFor="year" className="label">Year Published</label>
              <input
                id="year"
                name="year"
                type="number"
                min="1000"
                max={new Date().getFullYear()}
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g. 2020"
                className={`input-field ${errors.year ? 'border-red-400' : ''}`}
              />
              {errors.year && <p className="error-text">{errors.year}</p>}
            </div>

            <div>
              <label htmlFor="pages" className="label">Pages</label>
              <input
                id="pages"
                name="pages"
                type="number"
                min="1"
                value={formData.pages}
                onChange={handleChange}
                placeholder="e.g. 320"
                className={`input-field ${errors.pages ? 'border-red-400' : ''}`}
              />
              {errors.pages && <p className="error-text">{errors.pages}</p>}
            </div>
          </div>

          {/* Cover Image URL */}
          <div>
            <label htmlFor="cover" className="label">Cover Image URL (optional)</label>
            <input
              id="cover"
              name="cover"
              type="url"
              value={formData.cover}
              onChange={handleChange}
              placeholder="https://..."
              className="input-field"
            />
            <p className="text-xs text-gray-400 mt-1">Leave blank to use a default cover image.</p>
          </div>

          {/* Submit error summary */}
          {submitted && Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 font-sans text-sm font-medium">
                ⚠️ Please fix the errors above before submitting.
              </p>
            </div>
          )}

          {/* Submit button */}
          <div className="flex gap-4 pt-2">
            <button type="submit" className="btn-primary flex-1 text-center text-base py-3">
              Add Book to Library
            </button>
            <button
              type="button"
              onClick={() => { setFormData(emptyForm); setErrors({}); setSubmitted(false); }}
              className="btn-secondary px-6"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookPage;
