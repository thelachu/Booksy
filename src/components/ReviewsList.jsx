import { useState } from "react";
import { Star, X } from "lucide-react";
import { getBookReviews, getAverageRating, addReview } from "../lib/data";
import Review from "./Review";
import "./ReviewsList.css";

const ReviewsList = ({ book, username, onClose, onReviewAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const reviews = getBookReviews(book.id);
  const avgRating = getAverageRating(book.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || !reviewText.trim()) return;
    addReview({
      book_id: book.id,
      username,
      rating,
      review_text: reviewText.trim(),
    });
    setRating(0);
    setReviewText("");
    setShowForm(false);
    onReviewAdded();
  };

  return (
    <div className="reviews-overlay" onClick={onClose}>
      <div className="reviews-backdrop" />
      <div
        className="reviews-modal glass-strong"
        onClick={(e) => e.stopPropagation()}>
        <div className="reviews-modal-header">
          <img
            src={book.image_url}
            alt={book.title}
            className="reviews-book-image"
          />
          <div className="reviews-book-info">
            <h2 className="reviews-book-title">{book.title}</h2>
            <p className="reviews-book-author">{book.author}</p>
            <p className="reviews-book-desc">{book.description}</p>
            <div className="reviews-rating-row">
              <div className="reviews-stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`reviews-star ${i <= Math.round(avgRating) ? "reviews-star-filled" : "reviews-star-empty"}`}
                  />
                ))}
              </div>
              <span className="reviews-rating-text">
                {avgRating.toFixed(1)} · {reviews.length} reviews
              </span>
            </div>
          </div>
          <button onClick={onClose} className="reviews-close-btn">
            <X className="reviews-close-icon" />
          </button>
        </div>

        <div className="reviews-content">
          {!showForm ?
            <button
              onClick={() => setShowForm(true)}
              className="reviews-write-btn">
              Write a Review
            </button>
          : <form onSubmit={handleSubmit} className="reviews-form">
              <div>
                <label className="reviews-form-label">Rating</label>
                <div className="reviews-form-stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      type="button"
                      className="reviews-form-star-btn"
                      onMouseEnter={() => setHoverRating(i)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(i)}>
                      <Star
                        className={`reviews-form-star ${i <= (hoverRating || rating) ? "reviews-star-filled" : "reviews-star-empty"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="reviews-form-label">Review</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={3}
                  className="reviews-form-textarea"
                  placeholder="Share your thoughts..."
                />
              </div>
              <div className="reviews-form-actions">
                <button
                  type="submit"
                  disabled={rating === 0 || !reviewText.trim()}
                  className="reviews-submit-btn">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setRating(0);
                    setReviewText("");
                  }}
                  className="reviews-cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          }

          {reviews.length > 0 ?
            reviews.map((r) => <Review key={r.id} review={r} />)
          : <p className="reviews-empty">No reviews yet. Be the first!</p>}
        </div>
      </div>
    </div>
  );
};

export default ReviewsList;
