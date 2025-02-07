import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MyButton, MyTextFields } from "../../index";

export function RestaurantModal({ action, handleClose, data, ...props }) {
  const [restaurant, setRestaurant] = useState(
    data != null && data.restaurantName != null ? data.restaurantName : ""
  );
  const [address, setAddress] = useState(
    data != null && data.address != null ? data.address : ""
  );
  const [cuisine, setCuisine] = useState(
    data != null && data.cuisine ? data.cuisine : ""
  );
  const [contact, setContact] = useState(
    data != null && data.contact ? data.contact : ""
  );
  const handleRestaurantChange = (event) => setRestaurant(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleCuisineChange = (event) => setCuisine(event.target.value);
  const handleContactChange = (event) => setContact(event.target.value);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography color="#4C4A4A" variant="h6" fontWeight="bold">
          {action} Restaurant
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <MyTextFields
        id="outlined-password-input"
        label="Restaurant Name"
        type="text"
        variant="outlined"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
        sx={{ width: "100%" }}
        value={restaurant}
        onChange={handleRestaurantChange}
      ></MyTextFields>

      <MyTextFields
        id="outlined-password-input"
        label="Address"
        type="text"
        variant="outlined"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
        sx={{ width: "100%" }}
        value={address}
        onChange={handleAddressChange}
      ></MyTextFields>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="restaurant-label">Cuisine style</InputLabel>
        <Select
          labelId="restaurant-label"
          value={cuisine}
          onChange={handleCuisineChange}
        >
          <MenuItem value="Restaurant A">Restaurant A</MenuItem>
          <MenuItem value="Restaurant B">Restaurant B</MenuItem>
          <MenuItem value="Restaurant C">Restaurant C</MenuItem>
        </Select>
      </FormControl>

      <MyTextFields
        id="outlined-password-input"
        label="Contact"
        type="text"
        variant="outlined"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
        sx={{ width: "100%" }}
        value={contact}
        onChange={handleContactChange}
      ></MyTextFields>

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div
          className="btn_created"
          style={{
            marginTop: 20,
          }}
        >
          <MyButton
            label="Close"
            variant="outlined"
            sx={{ width: 120, height: "40px" }}
            style={{ marginRight: 12 }}
            onClick={handleClose}
          ></MyButton>
          {action == "Add" ? (
            <MyButton
              label="Add"
              variant="contained"
              sx={{ width: 120, height: "40px" }}
              onClick={handleClose}
            ></MyButton>
          ) : (
            <MyButton
              label="Edit"
              variant="contained"
              sx={{ width: 120, height: "40px" }}
              onClick={handleClose}
            ></MyButton>
          )}
        </div>
      </Box>
    </div>
  );
}
