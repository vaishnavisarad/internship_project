import React from "react";
import PropTypes from "prop-types";
import DishCard from "./DishCard";
import "./DishGrid.css";

const DishGrid = ({ dishes, togglePublished }) => {
  if (!Array.isArray(dishes)) {
    console.error("Expected 'dishes' to be an array");
    return null;
  }

  if (dishes.length === 0) {
    return <p>No dishes available.</p>;
  }

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <DishCard
          key={dish.dish_id}
          dish={dish}
          togglePublished={togglePublished}
        />
      ))}
    </div>
  );
};

DishGrid.propTypes = {
  dishes: PropTypes.array.isRequired,
  togglePublished: PropTypes.func.isRequired,
};

export default DishGrid;
