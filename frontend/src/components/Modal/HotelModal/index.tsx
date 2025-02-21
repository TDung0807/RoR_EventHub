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
import { addHotel, putHotel } from "../../../service/Hotel";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function HotelModal({ action, handleClose, data, ...props }) {
  const hotelId = data != null && data.id != null ? data.id : "";

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

  const { mutateAsync: addingHotelsFunc } = useMutation({
    mutationFn: addHotel,
  });
  const { mutateAsync: putHotelFunc } = useMutation({
    mutationFn: putHotel,
  });
  const addingHotels = async () => {
    try {
      const result = await addingHotelsFunc({
        name: hotelName,
        address: address,
        rating: starValue,
        star: starValue,
        distance: distant,
        contact: contact,
        checkin_time: checkinTime,
        checkout_time: checkoutTime,
      });
      if (result.status != 404 && result.status != 500) {
        toast("Thêm thành công ùi", {
          autoClose: 3000,
          type: "success",
        });
      } else {
        toast("Lỗi ùi nè bạn ui", {
          autoClose: 3000,
          type: "error",
        });
      }
      handleClose();
    } catch {
      toast("Lỗi ùi nè bạn ui", {
        autoClose: 3000,
        type: "error",
      });
    }
  };
  const editHotels = async () => {
    try {
      const result = await putHotelFunc({
        id: hotelId,
        name: hotelName,
        address: address,
        rating: starValue,
        star: starValue,
        distance: distant,
        contact: contact,
        checkin_time: checkinTime,
        checkout_time: checkoutTime,
      });
      if (result.status != 404 && result.status != 500) {
        toast("Sửa thành công ùi", {
          autoClose: 3000,
          type: "success",
        });
      } else {
        toast("Lỗi ùi nè bạn ui", {
          autoClose: 3000,
          type: "error",
        });
      }
    } catch {
      toast("Lỗi ùi nè bạn ui", {
        autoClose: 3000,
        type: "error",
      });
    }
    handleClose();
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
              onClick={editHotels}
            ></MyButton>
          )}
        </div>
      </Box>
    </div>
  );
}
