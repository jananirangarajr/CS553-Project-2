import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGridApiRef } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const Home = ({ isFormSubmitted, setFalse }) => {
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [cars, setCars] = useState([]);
  const gridApiRef = useGridApiRef();
  const container_name = process.env.REACT_APP_AUTOMOBILE_CONTAINER_NAME;
  const [updateCars, setUpdateCars] = useState({
    vin: "",
    plate: "",
    state: "",
    model: "",
    year: "",
    owner_name: "",
    owner_address: "",
    owner_dl: "",
    problem_description: "",
    date_in: "",
    date_out: "",
    technician: "",
    shop_id: "",
    shop_name: "",
    shop_city: "",
    shop_state: "",
  });

  useEffect(() => {
    fetchData();
  }, []);



const fetchData = async () => {
  console.log(container_name)
  const urls = 'http://localhost:8000/cars'
    fetch(urls)
      .then((response) => response.json())
      .then((data) => {
        const carsWithIds = data.result.map((car, index) => ({
          id: index + 1,
          ...car,
        }));
        setCars(carsWithIds);
       
      })
      .catch((error) => console.log(error));
  };

  if (isFormSubmitted) {
    fetchData();
    // Perform actions when isFormSubmitted is true
    console.log("Form has been submitted!");
    // You can add your custom logic here
    setFalse();
  }

  const updateCar = async (id) => {
    try {
      const url = `http://localhost:8000/cars/${id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateCars),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          handleClose();
          fetchData();
          Swal.fire({
            title: "Success",
            text: "Car information updated successfully",
            icon: "success",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while updating car information",
            icon: "error",
          });
        });
    } catch (error) {
      console.error("Error occurred during deletion:", error);
    }
  };

  const deleteCar = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/cars/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // console.log(cars.filter((row) => row._id !== id));
        // const updatedRows = cars.filter((row) => row._id !== id);
        // setCars(updatedRows);
        // console.log(cars);
        fetchData();
        // gridApiRef.current.clearSelection();
        Swal.fire({
          icon: "success",
          title: "Deletion successful",
          text: "The entry has been deleted successfully",
        });
        console.log("Deletion successful");
      } else {
        console.log("Deletion failed");
      }
    } catch (error) {
      console.error("Error occurred during deletion:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(selectedRows[0]._id)
    // updateCar(selectedRows[0]._id);
    selectedRows.forEach((item) => {
      const id = item._id;
      updateCar(id);
    
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRowSelection = (params) => {
    const selectedData = cars.filter((row) => params.includes(row.id));

    setSelectedRows(selectedData);
  };

  const handleEditButtonClick = () => {
    handleOpen();
    console.log("Edit button clicked for selected rows:", selectedRows);
    const updatedCars = { ...updateCars };
    selectedRows.forEach((item) => {
      for (const key in item) {
        if (key in updatedCars) {
          // Check if the key exists in the state object
          updatedCars[key] = item[key]; // Update the corresponding value
        }
      }
    });
    setUpdateCars(updatedCars);
 
  };
  const handleDeleteButtonClick = () => {
    console.log("Delete button clicked for selected rows:", selectedRows);
    selectedRows.forEach((item) => {
      const id = item._id;
      deleteCar(id);
    });
  };

  const columns = [
    { field: "vin", headerName: "VIN", width: 150 },
    { field: "plate", headerName: "Plate", width: 150 },
    { field: "state", headerName: "State", width: 100 },
    { field: "model", headerName: "Model", width: 150 },
    { field: "year", headerName: "Year", width: 100 },
    { field: "owner_name", headerName: "Owner Name", width: 200 },
    { field: "owner_address", headerName: "Owner Address", width: 250 },
    { field: "owner_dl", headerName: "Owner DL", width: 150 },
    {
      field: "problem_description",
      headerName: "Problem Description",
      width: 250,
    },
    { field: "date_in", headerName: "Date In", width: 150 },
    { field: "date_out", headerName: "Date Out", width: 150 },
    { field: "technician", headerName: "Technician", width: 150 },
    { field: "shop_id", headerName: "Shop ID", width: 100 },
    { field: "shop_name", headerName: "Shop Name", width: 200 },
    { field: "shop_city", headerName: "Shop City", width: 150 },
    { field: "shop_state", headerName: "Shop State", width: 150 },
  ];

  const isButtonDisabled = selectedRows.length === 0 || selectedRows.length > 1;
  const isButtonDisabledForDelete = selectedRows.length === 0;



  return (
    <div>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={cars}
          columns={columns}
          checkboxSelection={true}
          disableSelectionOnClick
          // selectionModel={selectedRows}
          onSelectionModelChange={handleRowSelection}
          apiRef={gridApiRef}
        />
      </div>

      <div>
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditButtonClick}
          disabled={isButtonDisabled}
        >
          Edit
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteButtonClick}
          disabled={isButtonDisabledForDelete}
        >
          Delete
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
        <DialogTitle>Add New Car Details</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Car's Information
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <TextField
                  name="vin"
                  label="VIN"
                  value={updateCars.vin}
                  onChange={(e) =>
                    setUpdateCars({ ...updateCars, vin: e.target.value })
                  }
                  style={{ marginRight: "1rem" }}
                />
                <TextField
                  name="plate"
                  label="Plate #"
                  value={updateCars.plate}
                  onChange={(e) =>
                    setUpdateCars({ ...updateCars, plate: e.target.value })
                  }
                  style={{ marginRight: "1rem" }}
                />
                <TextField
                  name="state"
                  label="State"
                  value={updateCars.state}
                  onChange={(e) =>
                    setUpdateCars({ ...updateCars, state: e.target.value })
                  }
                />
              </Box>
              <Box display="flex" alignItems="center" mb={3}>
                <TextField
                  name="model"
                  label="Make/Model"
                  value={updateCars.model}
                  onChange={(e) =>
                    setUpdateCars({ ...updateCars, model: e.target.value })
                  }
                  style={{ marginRight: "1rem" }}
                />
                <TextField
                  name="year"
                  label="Year"
                  value={updateCars.year}
                  onChange={(e) =>
                    setUpdateCars({ ...updateCars, year: e.target.value })
                  }
                  style={{ marginRight: "1rem" }}
                />
              </Box>
              <TextField
                name="problem_description"
                label="Problem Description"
                value={updateCars.problem_description}
                onChange={(e) =>
                  setUpdateCars({
                    ...updateCars,
                    problem_description: e.target.value,
                  })
                }
                multiline
                rows={4}
                fullWidth
                style={{ marginBottom: "1rem" }}
              />
              <Box display="flex" alignItems="center" mb={2}>
                <TextField
                  name="date_in"
                  label="Date In"
                  value={updateCars.date_in}
                  onChange={(e) =>
                    setUpdateCars({ ...updateCars, date_in: e.target.value })
                  }
                  style={{ marginRight: "1rem" }}
                />
                <TextField
                  name="date_out"
                  label="Date Out"
                  value={updateCars.date_out}
                  onChange={(e) =>
                    setUpdateCars({ ...updateCars, date_out: e.target.value })
                  }
                />
              </Box>
              <TextField
                name="technician"
                label="Technician Name"
                value={updateCars.technician}
                onChange={(e) =>
                  setUpdateCars({ ...updateCars, technician: e.target.value })
                }
                style={{ marginBottom: "1rem" }}
              />
            </Box>
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Owner's Information
              </Typography>
              <TextField
                name="owner_name"
                label="Owner Name"
                value={updateCars.owner_name}
                onChange={(e) =>
                  setUpdateCars({ ...updateCars, owner_name: e.target.value })
                }
                style={{ marginBottom: "1rem" }}
              />
              <TextField
                name="owner_address"
                label="Owner Address"
                value={updateCars.owner_address}
                onChange={(e) =>
                  setUpdateCars({
                    ...updateCars,
                    owner_address: e.target.value,
                  })
                }
                multiline
                rows={2}
                fullWidth
                style={{ marginBottom: "1rem" }}
              />
              <TextField
                name="owner_dl"
                label="Owner DL"
                value={updateCars.owner_dl}
                onChange={(e) =>
                  setUpdateCars({ ...updateCars, owner_dl: e.target.value })
                }
                style={{ marginBottom: "1rem" }}
              />
            </Box>
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Shop's Information
              </Typography>

              <Box display="flex" alignItems="center" mb={2}>
                <TextField
                  name="shop_id"
                  label="Shop ID"
                  value={updateCars.shop_id}
                  onChange={(e) =>
                    setUpdateCars({ ...updateCars, shop_id: e.target.value })
                  }
                  style={{ marginRight: "1rem" }}
                />
                <TextField
                  name="shop_name"
                  label="Shop Name"
                  value={updateCars.shop_name}
                  onChange={(e) =>
                    setUpdateCars({ ...updateCars, shop_name: e.target.value })
                  }
                />
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <TextField
                  name="shop_city"
                  label="Shop City"
                  value={updateCars.shop_city}
                  onChange={(e) =>
                    setUpdateCars({ ...updateCars, shop_city: e.target.value })
                  }
                  style={{ marginRight: "1rem" }}
                />
                <TextField
                  name="shop_state"
                  label="Shop State"
                  value={updateCars.shop_state}
                  onChange={(e) =>
                    setUpdateCars({ ...updateCars, shop_state: e.target.value })
                  }
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Update
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};


export default Home;

