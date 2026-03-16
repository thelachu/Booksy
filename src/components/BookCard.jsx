import { Star } from "lucide-react";
import { getAverageRating, getBookReviews } from "../lib/data";
import "./BookCard.css";

const BookCard = ({ book, onClick }) => {
  const avgRating = getAverageRating(book.id);
  const reviewCount = getBookReviews(book.id).length;

  return (
    <div onClick={onClick} className="book-card glass">
      <div className="book-card-image-wrap">
        <img
          src={book.image_url}
          alt={book.title}
          className="book-card-image"
          loading="lazy"
        />
      </div>
      <div className="book-card-info glass-strong">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">{book.author}</p>
        <div className="book-card-footer">
          <div className="book-card-stars">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`book-card-star ${i <= Math.round(avgRating) ? "book-card-star-filled" : "book-card-star-empty"}`}
              />
            ))}
          </div>
          <span className="book-card-count">
            {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
