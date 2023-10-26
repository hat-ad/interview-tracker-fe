import React, { useState } from "react";
import { StarRatingProps } from "../utils/interface";

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleMouseEnter = (newRating: number) => {
    setHoveredRating(newRating);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleRatingClick = (clickedRating: number) => {
    onRatingChange(clickedRating);
  };

  const stars: JSX.Element[] = [];
  const maxRating: number = 5;

  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <span
        key={i}
        className={`star ${i <= (hoveredRating || rating) ? "filled" : ""}`}
        onClick={() => handleRatingClick(i)}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
      >
        &#9733;
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
