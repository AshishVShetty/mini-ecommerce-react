import { Star } from "lucide-react";

export default function StarRating({ rating = 0, reviewsCount = null, size = 15 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.8;
  const totalStars = 5;

  return (
    <div className="star-rating" title={`${rating} out of 5 stars`}>
      <div className="stars-wrapper">
        {Array.from({ length: totalStars }).map((_, index) => {
          const starNumber = index + 1;
          const isFilled = starNumber <= fullStars;
          const isHalf = !isFilled && hasHalfStar && starNumber === fullStars + 1;

          return (
            <span key={index} className="star-icon-wrap">
              <Star
                size={size}
                className={isFilled ? "star-filled" : isHalf ? "star-half" : "star-empty"}
                fill={isFilled ? "#f59e0b" : isHalf ? "#fcd34d" : "transparent"}
                color={isFilled || isHalf ? "#f59e0b" : "#cbd5e1"}
                strokeWidth={1.7}
              />
            </span>
          );
        })}
      </div>
      <span className="rating-score">{Number(rating).toFixed(1)}</span>
      {reviewsCount !== null && (
        <span className="rating-reviews">({reviewsCount})</span>
      )}
    </div>
  );
}
