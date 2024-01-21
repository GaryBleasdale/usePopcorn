import { useState } from "react";

export default function StarRating({ maxRating = 5 }) {
  const [selectedStar, setSelectedStar] = useState(maxRating);
  const [hoveredStar, setHoveredStar] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  function handleStarSelect(e) {
    setSelectedStar(parseInt(e.target.id, 10));
  }

  function handleHover(e) {
    setIsHovering(true);
    setHoveredStar(parseInt(e.target.id, 10));
  }

  function handleMouseLeave() {
    setIsHovering(false);
    setHoveredStar(null);
  }

  return (
    <div onMouseLeave={handleMouseLeave}>
      <div className="star-container">
        {Array.from({ length: maxRating }, (_, i) => {
          const starId = i + 1;
          const fillColor = isHovering
            ? starId <= hoveredStar
              ? "#EFCE4A"
              : "#FFFFFF"
            : starId <= selectedStar
            ? "#EFCE4A"
            : "#FFFFFF";

          return (
            <Star
              key={starId}
              id={starId}
              handleStarSelect={handleStarSelect}
              color={{ fill: fillColor, stroke: "#000000", strokeWidth: "1px" }}
              handleHover={handleHover}
            />
          );
        })}
      </div>
      <p>{isHovering ? hoveredStar : selectedStar}</p>
    </div>
  );
}

function Star({ id, handleStarSelect, color, handleHover }) {
  return (
    <span>
      <svg
        height="800px"
        width="800px"
        viewBox="0 0 53.867 53.867"
        style={{ width: "40px", height: "40px" }}
        onClick={handleStarSelect}
        onMouseEnter={handleHover}
        id={id}
      >
        <polygon
          style={color}
          points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182"
          id={id}
        />
      </svg>
    </span>
  );
}
