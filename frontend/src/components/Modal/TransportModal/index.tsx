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
export function TransportModal({ action, handleClose, data, ...props }) {
  const [vendorName, setVendorName] = useState(
    data != null && data.vendorName != null ? data.vendorName : ""
  );
  const [transportType, setTransportType] = useState(
    data != null && data.transportType != null ? data.transportType : ""
  );
  const [hotelTime, setHotelTime] = useState(
    data != null && data.hotelTime != null ? data.hotelTime : null
  );
  const [officeTime, setOfficeTime] = useState(
    data != null && data.officeTime != null ? data.officeTime : null
  );
  const [remark, setRemark] = useState(
    data != null && data.remark ? data.remark : ""
  );

  const handleVendorNameChange = (event) => setVendorName(event.target.value);
  const handleTransportTypeChange = (event) =>
    setTransportType(event.target.value);

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
            onChange={setHotelTime}
          />
        </div>

        <div style={{ width: 187 }}>
          <DateTimeField
            label="Office pickup time"
            value={officeTime}
            onChange={setOfficeTime}
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
  );
}
