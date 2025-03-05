import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Rating,
} from "@mui/material";
import { MyButton } from "../../index";
import { addHotel, putHotel } from "../../../service/Hotel";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function HotelModal({
  action,
  handleClose,
  data,
  refetchGuessGroup = null,
  refetchHotels = null,
  ...props
}) {
  const hotelId = data?.id || "";

  const [formValues, setFormValues] = useState({
    address: data?.address || "",
    hotelName: data?.name || "",
    remark: data?.remark || "",
    distant: data?.distance || "",
    starValue: data?.star || 0,
    checkinTime: data?.checkin_time ? formatTime(data.checkin_time) : "",
    checkoutTime: data?.checkout_time ? formatTime(data.checkout_time) : "",
    contact: data?.contact || "",
  });

  const [errors, setErrors] = useState({});

  const { mutateAsync: addingHotelsFunc } = useMutation({
    mutationFn: addHotel,
  });
  const { mutateAsync: putHotelFunc } = useMutation({ mutationFn: putHotel });

  function formatTime(time) {
    const date = new Date(time);
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    try {
      setErrors({
        ...errors,
        [name]: value.trim() === "" ? "This field is required" : "",
      });
    } catch {}
  };

  const validate = () => {
    let tempErrors = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key] && key !== "remark") {
        tempErrors[key] = "This field is required";
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const payload = {
      name: formValues.hotelName,
      address: formValues.address,
      rating: formValues.starValue,
      star: formValues.starValue,
      distance: formValues.distant,
      contact: formValues.contact,
      checkin_time: formValues.checkinTime,
      checkout_time: formValues.checkoutTime,
      remark: formValues.remark,
    };
    try {
      const result =
        action === "Add"
          ? await addingHotelsFunc(payload)
          : await putHotelFunc({ id: hotelId, ...payload });
      if (result.status !== 404 && result.status !== 500) {
        toast(`${action} Succesfully`, { autoClose: 3000, type: "success" });
        refetchHotels?.();
        refetchGuessGroup?.();
      } else {
        toast(`${action} Failure`, { autoClose: 3000, type: "error" });
      }
      handleClose();
    } catch {
      toast(`${action} Failure`, { autoClose: 3000, type: "error" });
    }
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
        name="hotelName"
        value={formValues.hotelName}
        onChange={handleChange}
        sx={{ mb: 3 }}
        //@ts-ignore
        error={!!errors.hotelName}
        //@ts-ignore

        helperText={errors.hotelName}
      />

      <TextField
        fullWidth
        label="Address"
        name="address"
        value={formValues.address}
        onChange={handleChange}
        sx={{ mb: 3 }} //@ts-ignore
        error={!!errors.address}
        //@ts-ignore

        helperText={errors.address}
      />

      <TextField
        fullWidth
        label="Distant"
        name="distant"
        type="number"
        value={formValues.distant}
        onChange={handleChange}
        sx={{ mb: 3 }}
        //@ts-ignore

        error={!!errors.distant}
        //@ts-ignore

        helperText={errors.distant}
      />

      <TextField
        fullWidth
        label="Contact"
        name="contact"
        value={formValues.contact}
        onChange={handleChange}
        sx={{ mb: 3 }}
        //@ts-ignore

        error={!!errors.contact}
        //@ts-ignore

        helperText={errors.contact}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          name="checkinTime"
          type="time"
          value={formValues.checkinTime}
          onChange={handleChange}
          fullWidth
          //@ts-ignore
          error={!!errors.checkin_time}
          //@ts-ignore
          helperText={errors.checkin_time}
        />
        <TextField
          name="checkoutTime"
          type="time"
          value={formValues.checkoutTime}
          onChange={handleChange}
          fullWidth
          //@ts-ignore
          error={!!errors.checkout_time}
          //@ts-ignore
          helperText={errors.checkout_time}
        />
      </Box>

      <Typography sx={{ mb: 1, mt: 1 }}>Rating</Typography>
      <Rating
        name="starValue"
        precision={0.5}
        size="large"
        value={parseFloat(formValues.starValue)}
        onChange={(e, newValue) =>
          handleChange({ target: { name: "starValue", value: newValue } })
        }
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Remark"
        name="remark"
        value={formValues.remark}
        onChange={handleChange}
        multiline
        rows={3}
        sx={{ mb: 3 }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <MyButton
          label="Close"
          variant="outlined"
          sx={{ width: 120, height: "40px", mr: 2 }}
          onClick={handleClose}
        />
        <MyButton
          label={action}
          variant="contained"
          sx={{ width: 120, height: "40px" }}
          onClick={handleSubmit}
        />
      </Box>
    </div>
  );
}
