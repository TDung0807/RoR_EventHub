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
export function TransportTypeModal({ action, handleClose, data, ...props }) {
  const [type, setType] = useState(
    data != null && data.type != null ? data.type : ""
  );
  const [brand, setBrand] = useState(
    data != null && data.brand != null ? data.brand : ""
  );
  const [price, setPrice] = useState(
    data != null && data.price != null ? data.price : ""
  );
  const [remark, setRemark] = useState(
    data != null && data.remark ? data.remark : ""
  );

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
          <MenuItem value="Vendor A">Vendor A</MenuItem>
          <MenuItem value="Vendor B">Vendor B</MenuItem>
          <MenuItem value="Vendor C">Vendor C</MenuItem>
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
