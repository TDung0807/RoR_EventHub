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
export function HotelModal({ action, handleClose, data, ...props }) {
  const [roomType, setRoomType] = useState(
    data != null && data.roomType != null ? data.roomType : ""
  );
  const [hotelName, setHotelName] = useState(
    data != null && data.hotelName != null ? data.hotelName : ""
  );
  const [remark, setRemark] = useState(
    data != null && data.remark ? data.remark : ""
  );

  const handleHotelNameChange = (event) => setHotelName(event.target.value);
  const handleRoomTypeChange = (event) => setRoomType(event.target.value);
  const handleRemarkChange = (event) => setRemark(event.target.value);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography style={{ fontSize: 30 }} color="#4C4A4A" fontWeight="bold">
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
  );
}
