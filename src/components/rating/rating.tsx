type RatingProps = {
  rating: number;
  className?: string;
  showValue?: boolean;
}

function Rating({rating, className = '', showValue = false}: RatingProps): JSX.Element {
  const ratingPercent = Math.round(rating * 20);

  return (
    <div className={`rating ${className}`}>
      <div className="rating__stars">
        <span style={{width: `${ratingPercent}%`}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {showValue && (
        <span className="rating__value">{rating}</span>
      )}
    </div>
  );
}

export default Rating;

