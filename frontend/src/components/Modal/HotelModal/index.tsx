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
  Rating,
  Stack,
} from "@mui/material";
import { MyButton } from "../../index";
import { addHotel } from "../../../service/Hotel";
import { useMutation } from "@tanstack/react-query";
export function HotelModal({ action, handleClose, data, ...props }) {
  const [address, setAddress] = useState(
    data != null && data.address != null ? data.address : ""
  );
  const [hotelName, setHotelName] = useState(
    data != null && data.name != null ? data.name : ""
  );
  const [remark, setRemark] = useState(
    data != null && data.remark ? data.remark : ""
  );
  const [distant, setDistant] = useState(
    data != null && data.distance ? data.distance : ""
  );
  const [starValue, setStarValue] = useState(
    data != null && data.star ? data.star : ""
  );
  const [checkinTime, setCheckinTime] = useState(
    data != null && data.checkin_time != null
      ? () => {
          const date = new Date(data.checkin_time);
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          return `${hours}:${minutes}`;
        }
      : ""
  );
  const [checkoutTime, setCheckoutTime] = useState(
    data != null && data.checkout_time != null
      ? () => {
          const date = new Date(data.checkout_time);
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          return `${hours}:${minutes}`;
        }
      : ""
  );
  const [contact, setContact] = useState(
    data != null && data.contact != null ? data.contact : ""
  );
  const handleHotelNameChange = (event) => setHotelName(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleRemarkChange = (event) => setRemark(event.target.value);
  const handleStarChange = (event) => setStarValue(event.target.value);
  const handleDistantChange = (event) => setDistant(event.target.value);
  const handleContactChange = (event) => setContact(event.target.value);

  const { mutateAsync } = useMutation({ mutationFn: addHotel });
  const addingHotels = async () => {
    const result = await mutateAsync({
      name: hotelName,
      address: address,
      rating: starValue,
      star: starValue,
      distance: distant,
      contact: contact,
      checkin_time: checkinTime,
      checkout_time: checkoutTime,
    });
  };
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

      <TextField
        fullWidth
        label="Hotel Name"
        value={hotelName}
        onChange={handleHotelNameChange}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        label="Address"
        value={address}
        onChange={handleAddressChange}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        label="Distant"
        value={distant}
        type="number"
        onChange={handleDistantChange}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        label="Contact"
        value={contact}
        onChange={handleContactChange}
        sx={{ mb: 3 }}
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          value={checkinTime}
          placeholder="Check in"
          type="time"
          required
          fullWidth
          onChange={(e) => {
            setCheckinTime(e.target.value);
          }}
        />
        <TextField
          value={checkoutTime}
          placeholder="Check out"
          type="time"
          required
          fullWidth
          onChange={(e) => {
            setCheckoutTime(e.target.value);
          }}
        />
      </Box>
      <Typography sx={{ mb: 1, mt: 1, ml: 0.5 }}>Rating</Typography>
      <Rating
        sx={{ mb: 2 }}
        name="half-rating"
        defaultValue={2.5}
        precision={0.5}
        size="large"
        value={starValue}
        onChange={handleStarChange}
      />

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
              onClick={addingHotels}
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
