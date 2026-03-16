import { useState, useCallback } from "react";
import { Search, Plus } from "lucide-react";
import { searchBooks } from "../lib/data";
import BookCard from "./BookCard";
import ReviewsList from "./ReviewsList";
import AddBookModal from "./AddBookModal";
import search from "../assets/search.svg";
import "./Main.css";

const Main = ({ username }) => {
  const [query, setQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddBook, setShowAddBook] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);
  const books = searchBooks(query);

  return (
    <div className="main-page" key={refreshKey}>
      <div className="main-container">
        <div className="main-header">
          <h1 className="main-title">Library</h1>
          <p className="main-subtitle">
            Discover, review, and share your favorite reads.
          </p>
        </div>

        <div className="main-toolbar">
          <div className="main-search-wrap">
            <div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or author..."
                className="main-search-input"
              />
            </div>
          </div>
          <button onClick={() => setShowAddBook(true)} className="main-add-btn">
            <Plus className="main-add-btn-icon" />
            Add Book
          </button>
        </div>

        {books.length > 0 ?
          <div className="main-grid">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => setSelectedBook(book)}
              />
            ))}
          </div>
        : <div className="main-empty">
            <p>No books found.</p>
          </div>
        }
      </div>

      {selectedBook && (
        <ReviewsList
          book={selectedBook}
          username={username}
          onClose={() => setSelectedBook(null)}
          onReviewAdded={refresh}
        />
      )}
      {showAddBook && (
        <AddBookModal
          onClose={() => setShowAddBook(false)}
          onBookAdded={refresh}
        />
      )}
    </div>
  );
};

export default Main;
