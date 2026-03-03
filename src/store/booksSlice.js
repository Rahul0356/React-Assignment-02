import { createSlice } from '@reduxjs/toolkit';
import { books as initialBooks } from '../data/books';

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    // All books in the library
    list: initialBooks,
  },
  reducers: {
    // Action to add a new book to the front of the list
    addBook: (state, action) => {
      state.list.unshift(action.payload);
    },
  },
});

export const { addBook } = booksSlice.actions;
export default booksSlice.reducer;
