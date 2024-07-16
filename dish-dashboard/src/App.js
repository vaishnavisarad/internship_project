import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import "./App.css";
import DishGrid from "./components/DishGrid";

const socket = io("http://localhost:3001");

function App() {
  const [dishes, setDishes] = useState(() => {
    const savedDishes = localStorage.getItem("dishes");
    return savedDishes ? JSON.parse(savedDishes) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDishes();
    socket.on("dishUpdated", handleDishUpdate);
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      setError("Socket connection error, please try again later.");
    });
    return () => {
      socket.off("dishUpdated");
      socket.off("connect_error");
    };
  }, []);

  const fetchDishes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3001/api/dishes");
      const formattedDishes = response.data.map((dish) => ({
        ...dish,
        is_published: Boolean(dish.is_published),
      }));
      setDishes(formattedDishes);
      localStorage.setItem("dishes", JSON.stringify(formattedDishes));
    } catch (error) {
      console.error("Error fetching dishes:", error);
      setError("Error fetching dishes. Please try again later.");
      setDishes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDishUpdate = (updatedDish) => {
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish.dish_id === updatedDish.id
          ? { ...dish, is_published: Boolean(updatedDish.is_published) }
          : dish
      )
    );
  };

  const togglePublished = async (dishId, isPublished) => {
    if (typeof dishId === "undefined") {
      console.error("Dish ID is undefined");
      setError("Dish ID is undefined.");
      return;
    }

    const newStatus = !isPublished;

    const dishExists = dishes.some((dish) => dish.dish_id === dishId);
    if (!dishExists) {
      console.error(`Dish with ID ${dishId} does not exist`);
      setError(`Dish with ID ${dishId} does not exist.`);
      return;
    }

    try {
      await axios.patch(`http://localhost:3001/api/dishes/${dishId}`, {
        is_published: newStatus,
      });
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dish_id === dishId ? { ...dish, is_published: newStatus } : dish
        )
      );
    } catch (error) {
      console.error("Error toggling published status:", error);
      setError("Error toggling published status. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Dish Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <DishGrid dishes={dishes} togglePublished={togglePublished} />
      )}
    </div>
  );
}

export default App;
