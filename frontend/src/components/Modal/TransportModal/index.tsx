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
import { addTranspost, putTranspost } from "../../../service/Transport";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function TransportModal({
  action,
  handleClose,
  data,
  mainDataId,
  transportDataQueries = null,
  refetchGuessGroup = null,
  refetchFunc = null,
  ...props
}) {
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [remark, setRemark] = useState("");
  const [id, setId] = useState("");

  const transportType = ["Xe Máy", "Xe 4 chỗ", "Xe 7 chỗ", "Xe Limousine"];

  useEffect(() => {
    if (data) {
      setId(data.id || "");
      setType(data.transport_type || data.type || "");
      setBrand(data.brand || "");
      setPrice(data.price || "");
      setRemark(data.remark || "");
    }
  }, [data]); // Runs when `data` changes
  const { mutateAsync: addTransportFunc } = useMutation({
    mutationFn: addTranspost,
  });
  const { mutateAsync: putTransportFunc } = useMutation({
    mutationFn: putTranspost,
  });
  const addingTransport = async () => {
    try {
      const result = await addTransportFunc({
        vendor_id: mainDataId,
        transport_type: type,
        brand: brand,
        price: price,
        remark: remark,
      });
      if (result.status != 404 && result.status != 500) {
        toast("Thêm thành công", {
          autoClose: 3000,
          type: "success",
        });
        transportDataQueries.forEach((query) => query.refetch());

        handleClose();
      } else {
        toast("Lỗi không xác định", {
          autoClose: 3000,
          type: "error",
        });
      }
    } catch {
      toast("Lỗi không xác định", {
        autoClose: 3000,
        type: "error",
      });
    }
  };
  const editTransport = async () => {
    try {
      const result = await putTransportFunc({
        id: id,
        vendor_id: mainDataId,
        transport_type: type,
        brand: brand,
        price: price,
        remark: remark,
      });
      if (result.status != 404 && result.status != 500) {
        toast("Sửa thành công", {
          autoClose: 3000,
          type: "success",
        });
        handleClose();
        if (refetchGuessGroup != null) {
          refetchGuessGroup();
        }
        if (refetchFunc != null) {
          refetchFunc();
        }
      } else {
        toast("Lỗi không xác định", {
          autoClose: 3000,
          type: "error",
        });
      }
    } catch {
      toast("Lỗi không xác định", {
        autoClose: 3000,
        type: "error",
      });
    }
  };
  const handleTypeChange = (event) => setType(event.target.value);
  const handleBrandChange = (event) => setBrand(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);
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
          {action} Transport Type
        </Typography>
      </Box>

      {/* Form */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="vendor-label">Type</InputLabel>
        <Select labelId="vendor-label" value={type} onChange={handleTypeChange}>
          {transportType.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <MyTextFields
        id="outlined-password-input"
        label="Transport Brand"
        type="text"
        variant="outlined"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
        value={brand}
        onChange={handleBrandChange}
        sx={{ width: "100%" }}
      ></MyTextFields>

      <MyTextFields
        id="outlined-password-input"
        label="Price"
        type="text"
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
              onClick={addingTransport}
            ></MyButton>
          ) : (
            <MyButton
              label="Edit"
              variant="contained"
              sx={{ width: 120, height: "40px" }}
              onClick={editTransport}
            ></MyButton>
          )}
        </div>
      </Box>
    </div>
  );
}
