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
import { addRoom, putRoom } from "../../../service/Room";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function HotelTypeModal({
  action,
  handleClose,
  data,
  mainDataId,
  roomDataQueries = null,
  ...props
}) {
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [remark, setRemark] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (data) {
      setType(data.type || "");
      setPrice(data.price || "");
      setRemark(data.remark || "");
      setId(data.id || "");
    }
  }, [data]); // Runs when `data` changes

  const handleTypeChange = (event) => setType(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);

  const handleRemarkChange = (event) => setRemark(event.target.value);
  const { mutateAsync: addingRoomTypeFunc } = useMutation({
    mutationFn: addRoom,
  });
  const { mutateAsync: PutRoomTypeFunc } = useMutation({
    mutationFn: putRoom,
  });
  const roomTypeData = [
    "Phòng Tổng Thống",
    "Phòng Queen",
    "Phòng Đơn",
    "Phòng Đôi",
    "Phòng Gia Đình",
  ];
  const addingRoomType = async () => {
    try {
      const result = await addingRoomTypeFunc({
        hotel_id: mainDataId,
        name: roomTypeData[Number.parseInt(type) - 1],
        price: price,
        room_type: type,
        remark: remark,
      });
      if (result.status != 404 && result.status != 500) {
        toast("Thêm thành công ùi", {
          autoClose: 3000,
          type: "success",
        });
        roomDataQueries.forEach((query) => query.refetch());
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
  const editRoomType = async () => {
    try {
      const result = await PutRoomTypeFunc({
        hotel_id: mainDataId,
        id: id,
        name: roomTypeData[Number.parseInt(type) - 1],
        price: price,
        room_type: type,
        remark: remark,
      });
      if (result.status != 404 && result.status != 500) {
        toast("Sửa thành công ùi", {
          autoClose: 3000,
          type: "success",
        });
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
          {action} Room Type
        </Typography>
      </Box>

      {/* Form */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="vendor-label">Room Type</InputLabel>
        <Select labelId="vendor-label" value={type} onChange={handleTypeChange}>
          <MenuItem value="1">Phòng Tổng Thống</MenuItem>
          <MenuItem value="2">Phòng Queen</MenuItem>
          <MenuItem value="3">Phòng Đơn</MenuItem>
          <MenuItem value="4">Phòng Đôi</MenuItem>
          <MenuItem value="5">Phòng Gia Đình</MenuItem>
        </Select>
      </FormControl>

      <MyTextFields
        id="outlined-password-input"
        label="Price Per Night"
        type="number"
        variant="outlined"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
        value={price}
        onChange={handlePriceChange}
        sx={{ width: "100%" }}
      ></MyTextFields>
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
              onClick={addingRoomType}
            ></MyButton>
          ) : (
            <MyButton
              label="Edit"
              variant="contained"
              sx={{ width: 120, height: "40px" }}
              onClick={editRoomType}
            ></MyButton>
          )}
        </div>
      </Box>
    </div>
  );
}
