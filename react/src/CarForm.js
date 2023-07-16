import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
  } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const CarForm = ({ onAddCar, onSubmit }) => {
    const [open, setOpen] = useState(false);
    const container_name = process.env.REACT_APP_AUTOMOBILE_CONTAINER_NAME;

  const [car, setCar] = useState({
    vin: '',
    plate: '',
    state: '',
    model: '',
    year: '',
    owner_name: '',
    owner_address: '',
    owner_dl: '',
    problem_description: '',
    date_in: '',
    date_out: '',
    technician: '',
    shop_id: '',
    shop_name: '',
    shop_city: '',
    shop_state: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  };
  
  const storeCarinfo = async () => {
    try {
      const response = await fetch(`http://localhost:8000/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
      });
  
      const data = await response.json(); // Parse the response body as JSON
  
      if (response.ok) {
        // Car added successfully
        console.log('Car added successfully');
        console.log('Response:', data); // Log the response data
        // onDataGridReload();

        onSubmit();

        Swal.fire({
            icon: 'success',
            title: data.message,
            text: 'The work order has been created. The work order number is : ' + data.id,
          });
      } else {
        // Error occurred while adding the car
        console.error('Error adding car');
        console.log('Response:', data); // Log the response data
        Swal.fire({
            icon: 'error',
            title: 'Something bad happened',
            text:  data,
          });
      }
    } catch (error) {
      // Exception occurred while making the request
      console.error('Exception occurred:', error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCar(car);
    setOpen(false);
    setCar({
        vin: '',
        plate: '',
        state: '',
        model: '',
        year: '',
        owner_name: '',
        owner_address: '',
        owner_dl: '',
        problem_description: '',
        date_in: '',
        date_out: '',
        technician: '',
        shop_id: '',
        shop_name: '',
        shop_city: '',
        shop_state: ''
    });
    storeCarinfo();
    console.log(car)
  };

  return (
    <>
    <br/>
      <Button color="success" onClick={handleOpen} variant="contained">
        + Add New Car
      </Button>
      <Dialog open={open} onClose={handleClose}    fullWidth maxWidth="xl">
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
            value={car.vin}
            onChange={handleChange}
            required
            style={{ marginRight: '1rem' }}
          />
          <TextField
            name="plate"
            label="Plate #"
            value={car.plate}
            onChange={handleChange}
            required
            style={{ marginRight: '1rem' }}
          />
          <TextField
            name="state"
            label="State"
            value={car.state}
            onChange={handleChange}
            required
          />
        </Box>
        <Box display="flex" alignItems="center" mb={3}>
          <TextField
            name="model"
            label="Make/Model"
            value={car.model}
            onChange={handleChange}
            required
            style={{ marginRight: '1rem' }}
          />
          <TextField
            name="year"
            label="Year"
            value={car.year}
            onChange={handleChange}
            required
            style={{ marginRight: '1rem' }}
          />
            
        </Box>
        <TextField
          name="problem_description"
          label="Problem Description"
          value={car.problem_description}
          onChange={handleChange}
          required
          multiline
          rows={4}
          fullWidth
          style={{ marginBottom: '1rem' }}
        />
                <Box display="flex" alignItems="center" mb={2}>
          <TextField
            name="date_in"
            label="Date In"
            value={car.date_in}
            onChange={handleChange}
            required
            style={{ marginRight: '1rem' }}
          />
          <TextField
            name="date_out"
            label="Date Out"
            value={car.date_out}
            onChange={handleChange}
            required
          />
        </Box>
        <TextField
          name="technician"
          label="Technician Name"
          value={car.technician}
          onChange={handleChange}
          required
          style={{ marginBottom: '1rem' }}
        />
      </Box>
      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          Owner's Information
        </Typography>
        <TextField
          name="owner_name"
          label="Owner Name"
          value={car.owner_name}
          onChange={handleChange}
          required
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          name="owner_address"
          label="Owner Address"
          value={car.owner_address}
          onChange={handleChange}
          required
          multiline
          rows={2}
          fullWidth
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          name="owner_dl"
          label="Owner DL"
          value={car.owner_dl}
          onChange={handleChange}
          required
          style={{ marginBottom: '1rem' }}
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
            value={car.shop_id}
            onChange={handleChange}
            required
            style={{ marginRight: '1rem' }}
          />
          <TextField
            name="shop_name"
            label="Shop Name"
            value={car.shop_name}
            onChange={handleChange}
            required
          />
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            name="shop_city"
            label="Shop City"
            value={car.shop_city}
            onChange={handleChange}
            required
            style={{ marginRight: '1rem' }}
          />
          <TextField
            name="shop_state"
            label="Shop State"
            value={car.shop_state}
            onChange={handleChange}
            required
          />
        </Box>
      </Box>

  
    </DialogContent>
      <DialogActions>
      <Button color="success" type="submit" variant="contained">
        Add Car
      </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
      </form>
    </Dialog>
    <br/>
  </>
  );
};

export default CarForm;
