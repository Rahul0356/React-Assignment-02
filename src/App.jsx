import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrowserBooksPage from './pages/BrowserBooksPage';
import BookDetailsPage from './pages/BookDetailsPage';
import AddBookPage from './pages/AddBookPage';
import { store } from './store/store';
import Navbar from './compenents/Navbar';

// Layout wrapper that includes Navbar - used for all normal pages
const Layout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
  </>
);

const App = () => {
  
  return (
    // Provide Redux store to entire app
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Home page */}
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />

          {/* Browse all books */}
          <Route
            path="/books"
            element={
              <Layout>
                <BrowserBooksPage />
              </Layout>
            }
          />

          {/* Browse books filtered by category - dynamic route */}
          <Route
            path="/books/:category"
            element={
              <Layout>
                <BrowseBooksPage />
              </Layout>
            }
          />

          {/* Book details page - dynamic route with category and id */}
          <Route
            path="/books/:category/:id"
            element={
              <Layout>
                <BookDetailsPage />
              </Layout>
            }
          />

          {/* Add book page */}
          <Route
            path="/add-book"
            element={
              <Layout>
                <AddBookPage />
              </Layout>
            }
          />

          {/* 404 - catch all undefined routes - NO Navbar per requirements */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App