import React, { useState, useEffect } from "react";
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
import { addRestaurant, putRestaurant } from "../../../service/Restaurant";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function RestaurantModal({
  action,
  handleClose,
  data,
  refetchGuessGroup = null,
  refetchRestaurantFunc = null,
  ...props
}) {
  const [restaurant, setRestaurant] = useState("");
  const [address, setAddress] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [contact, setContact] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    if (data) {
      setId(data.id || "");
      setRestaurant(data.name || "");
      setAddress(data.address || "");
      setCuisine(data.cuisine || "");
      setContact(data.contact || "");
    }
  }, [data]); // Runs when `data` changes
  const cuisineType = ["Việt", "Thái", "Trung", "Hàn", "Nhật", "Pháp", "Anh"];

  const handleRestaurantChange = (event) => setRestaurant(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleCuisineChange = (event) => setCuisine(event.target.value);
  const handleContactChange = (event) => setContact(event.target.value);

  const { mutateAsync: addingRestaurantFunc } = useMutation({
    mutationFn: addRestaurant,
  });
  const { mutateAsync: putRestaurantFunc } = useMutation({
    mutationFn: putRestaurant,
  });

  const addingRestaurant = async () => {
    try {
      const result = await addingRestaurantFunc({
        name: restaurant,
        address: address,
        contact: contact,
        cuisine: cuisine,
      });
      if (result.status != 404 && result.status != 500) {
        toast("Thêm thành công ùi", {
          autoClose: 3000,
          type: "success",
        });
        if (refetchRestaurantFunc != null) {
          refetchRestaurantFunc();
        }
        handleClose();
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
  };
  const editRestaurant = async () => {
    try {
      const result = await putRestaurantFunc({
        id: id,
        name: restaurant,
        address: address,
        contact: contact,
        cuisine: cuisine,
      });
      if (result.status != 404 && result.status != 500) {
        toast("Sửa thành công ùi", {
          autoClose: 3000,
          type: "success",
        });
        handleClose();
        if (refetchGuessGroup != null) {
          refetchGuessGroup();
        }
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
  };
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
          {cuisineType.map((item, index) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
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
              onClick={addingRestaurant}
            ></MyButton>
          ) : (
            <MyButton
              label="Edit"
              variant="contained"
              sx={{ width: 120, height: "40px" }}
              onClick={editRestaurant}
            ></MyButton>
          )}
        </div>
      </Box>
    </div>
  );
}
