import React from "react";
import PropTypes from "prop-types";
import "./DishCard.css";

const DishCard = ({ dish, togglePublished }) => {
  if (!dish || typeof dish !== 'object') {
    console.error("Expected 'dish' to be a valid object");
    return null;
  }

  return (
    <div className="dish-card">
      <img 
        src={dish.image_url || "fallback-image-url.jpg"}
        alt={dish.dish_name || "Dish"} 
        className="dish-image" 
      />
      <div className="dish-info">
        <h2 className="dish-name">{dish.dish_name || "Unnamed Dish"}</h2>
      </div>
      <button
        className="toggle-button"
        onClick={() => togglePublished(dish.dish_id, dish.is_published)}
      >
        {dish.is_published ? "Unpublish" : "Publish"}
      </button>
    </div>
  );
};

DishCard.propTypes = {
  dish: PropTypes.shape({
    dish_id: PropTypes.number.isRequired,
    dish_name: PropTypes.string.isRequired,
    image_url: PropTypes.string,
    is_published: PropTypes.bool.isRequired,
  }).isRequired,
  togglePublished: PropTypes.func.isRequired,
};

export default DishCard;
