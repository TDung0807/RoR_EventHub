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
import { MyButton } from "../../index";
import CloseIcon from "@mui/icons-material/Close";

export function LunchBoxModal({ action, handleClose, data, ...props }) {
  const [restaurant, setRestaurant] = useState(
    data != null && data.restaurantName != null ? data.restaurantName : ""
  );
  const [dishes, setDishes] = useState(
    data != null && data.dished != null ? data.dished : ""
  );
  const [remark, setRemark] = useState(
    data != null && data.remark ? data.remark : ""
  );
  const handleRestaurantChange = (event) => setRestaurant(event.target.value);
  const handleDishesChange = (event) => setDishes(event.target.value);
  const handleRemarkChange = (event) => setRemark(event.target.value);
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
          {action} lunchbox
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Form */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="restaurant-label">Restaurant</InputLabel>
        <Select
          labelId="restaurant-label"
          value={restaurant}
          onChange={handleRestaurantChange}
        >
          <MenuItem value="Restaurant A">Restaurant A</MenuItem>
          <MenuItem value="Restaurant B">Restaurant B</MenuItem>
          <MenuItem value="Restaurant C">Restaurant C</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="dishes-label">Dishes</InputLabel>
        <Select
          labelId="dishes-label"
          value={dishes}
          onChange={handleDishesChange}
        >
          <MenuItem value="Dish 1">Dish 1</MenuItem>
          <MenuItem value="Dish 2">Dish 2</MenuItem>
          <MenuItem value="Dish 3">Dish 3</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Remark"
        value={remark}
        onChange={handleRemarkChange}
        multiline
        rows={3}
        sx={{ mb: 3 }}
      />

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
