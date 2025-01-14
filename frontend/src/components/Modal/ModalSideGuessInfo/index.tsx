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
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
export const ModalSideGuessinfo = ({
  open,
  handleClose,
  option = "Transport",
  action = "Add",
}) => {
  const [vendorName, setVendorName] = useState("");
  const [transportType, setTransportType] = useState("");
  const [hotelTime, setHotelTime] = useState(null);
  const [officeTime, setOfficeTime] = useState(null);

  const [roomType, setRoomType] = useState("");
  const [hotelName, setHotelName] = useState("");

  const [restaurant, setRestaurant] = useState("");
  const [dishes, setDishes] = useState("");
  const [remark, setRemark] = useState("");

  const handleVendorNameChange = (event) => setVendorName(event.target.value);
  const handleTransportTypeChange = (event) =>
    setTransportType(event.target.value);
  const handleHotelPickupChange = (event) => setHotelTime(event.target.value);
  const handleOfficePickupChange = (event) => setOfficeTime(event.target.value);

  const handleHotelNameChange = (event) => setHotelName(event.target.value);
  const handleRoomTypeChange = (event) => setRoomType(event.target.value);
  const handleRestaurantChange = (event) => setRestaurant(event.target.value);
  const handleDishesChange = (event) => setDishes(event.target.value);
  const handleRemarkChange = (event) => setRemark(event.target.value);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        {/* Header */}
        {option == "Lunchbox" && (
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
        )}
        {option == "Hotel" && (
          <div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography
                style={{ fontSize: 30 }}
                color="#4C4A4A"
                fontWeight="bold"
              >
                {action} Hotel
              </Typography>
            </Box>

            {/* Form */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="hotel-label">Hotel</InputLabel>
              <Select
                labelId="hotel-label"
                value={hotelName}
                onChange={handleHotelNameChange}
              >
                <MenuItem value="Hotel A">Hotel A</MenuItem>
                <MenuItem value="Hotel B">Hotel B</MenuItem>
                <MenuItem value="Hotel C">Hotel C</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="roomtype-label">Room type</InputLabel>
              <Select
                labelId="roomtype-label"
                value={roomType}
                onChange={handleRoomTypeChange}
              >
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="6">6</MenuItem>
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
        )}
        {option == "Transport" && (
          <div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography
                style={{ fontSize: 30 }}
                color="#4C4A4A"
                fontWeight="bold"
              >
                {action} Transport
              </Typography>
            </Box>

            {/* Form */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="vendor-label">Vendor</InputLabel>
              <Select
                labelId="vendor-label"
                value={vendorName}
                onChange={handleVendorNameChange}
              >
                <MenuItem value="Vendor A">Vendor A</MenuItem>
                <MenuItem value="Vendor B">Vendor B</MenuItem>
                <MenuItem value="Vendor C">Vendor C</MenuItem>
              </Select>
            </FormControl>

            <MyTextFields
              id="outlined-password-input"
              label="Transport Type"
              type="text"
              variant="outlined"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "20px",
              }}
              value={transportType}
              onChange={handleTransportTypeChange}
              sx={{ width: "100%" }}
            ></MyTextFields>

            <div style={{ display: "flex", marginBottom: 24 }}>
              <div style={{ width: 187, marginRight: 24 }}>
                <DateTimeField
                  label="Hotel pickup time"
                  value={hotelTime}
                  onChange={handleHotelPickupChange}
                  format="LLL"
                />
              </div>

              <div style={{ width: 187 }}>
                <DateTimeField
                  label="Office pickup time"
                  value={officeTime}
                  onChange={handleOfficePickupChange}
                  format="LLL"
                />
              </div>
            </div>
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
        )}
      </Box>
    </Modal>
  );
};
