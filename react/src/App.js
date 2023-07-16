import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import CarForm from "./CarForm";
import Home from "./Home";

const App = () => {
  const [cars, setCars] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const handleAddCar = (newCar) => {
    setCars((prevCars) => [...prevCars, newCar]);
  };

  const handleFormSubmit = () => {
    // Perform form submission logic
    setIsFormSubmitted(true);
  };

  const handlesetFalse = () => {
    // Perform form submission logic
    setIsFormSubmitted(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
       <br />
      <Container maxWidth="xl" style={{ flex: 1 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Mad Mike’s Mechanic Shop
        </Typography>
        <CarForm onAddCar={handleAddCar} onSubmit={handleFormSubmit} />
        <br />
        <Home isFormSubmitted={isFormSubmitted} setFalse={handlesetFalse} />
      </Container>

      <footer
        style={{
          backgroundColor: "lightgray",
          padding: "20px",
          textAlign: "center",
        }}
      >
        This application is developed by Janani Rangaraj and Manasa Elesetty as a project 1 assignment for the course CS 553.
      </footer>
    </div>
  );
};

export default App;
