import { Star } from "lucide-react";
import "./Review.css";

const Review = ({ review }) => {
  const date = new Date(review.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="review-item">
      <div className="review-header">
        <span className="review-username">{review.username}</span>
        <span className="review-date">{date}</span>
      </div>
      <div className="review-stars">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`review-star ${i <= review.rating ? "review-star-filled" : "review-star-empty"}`}
          />
        ))}
      </div>
      <p className="review-text">{review.review_text}</p>
    </div>
  );
};

export default Review;
