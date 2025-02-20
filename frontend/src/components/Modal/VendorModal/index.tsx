import React, { useEffect, useState } from "react";
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
import { addVendor, putVendor } from "../../../service/Vendor";
import { useMutation } from "@tanstack/react-query";
export function VendorModal({ action, handleClose, data, ...props }) {
  const [vendorName, setVendorName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [contact, setContact] = useState(null);
  const [timeLimit, setTimeLimit] = useState(null);
  const [distanceLimit, setDistanceLimit] = useState("");
  const [transportType, setTransportType] = useState("");

  const [id, setId] = useState("");
  useEffect(() => {
    if (data) {
      setId(data.id || "");
      setVendorName(data.name || "");
      setServiceType(data.service || "");
      setContact(data.contact || null);
      setTimeLimit(data.time_limit || null);
      setDistanceLimit(data.distance_limit || "");
      setTransportType(data.transport_type || "");
    }
  }, [data]); // Runs when `data` changes

  const { mutateAsync: addingVendorsFunc } = useMutation({
    mutationFn: addVendor,
  });
  const { mutateAsync: editVendorsFunc } = useMutation({
    mutationFn: putVendor,
  });

  const addingVendors = async () => {
    const result = await addingVendorsFunc({
      name: vendorName,
      service: serviceType,
      contact: contact,
      time_limit: timeLimit,
      distance_limit: distanceLimit,
      transport_type: transportType,
    });
    if (result.status != 404 && result.status != 500) {
      alert("Add Thành Công");
    } else {
      alert("Lỗi Add");
    }
  };

  const editVendors = async () => {
    const result = await editVendorsFunc({
      id: id,
      name: vendorName,
      service: serviceType,
      contact: contact,
      time_limit: timeLimit,
      distance_limit: distanceLimit,
      transport_type: transportType,
    });
    if (result.status != 404 && result.status != 500) {
      alert("Edit Thành Công");
    } else {
      alert("Lỗi Edit");
    }
  };

  const handleVendorNameChange = (event) => setVendorName(event.target.value);
  const handleTransportTypeChange = (event) =>
    setServiceType(event.target.value);
  const handleContactChange = (event) => setContact(event.target.value);
  const handleTimeLimitChange = (event) => setTimeLimit(event.target.value);

  const handleDistanceLimitChange = (event) =>
    setDistanceLimit(event.target.value);
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
          {action} Vendors
        </Typography>
      </Box>

      {/* Form */}
      <MyTextFields
        id="outlined-password-input"
        label="Vendor Name"
        type="text"
        variant="outlined"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
        value={vendorName}
        onChange={handleVendorNameChange}
        sx={{ width: "100%" }}
      ></MyTextFields>
      <MyTextFields
        id="outlined-password-input"
        label="Service Type"
        type="text"
        variant="outlined"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
        value={serviceType}
        onChange={handleTransportTypeChange}
        sx={{ width: "100%" }}
      ></MyTextFields>

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
        value={contact}
        onChange={handleContactChange}
        sx={{ width: "100%" }}
      ></MyTextFields>
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
        onChange={(e) => {
          setTransportType(e.target.value);
        }}
        sx={{ width: "100%" }}
      ></MyTextFields>
      <MyTextFields
        id="outlined-password-input"
        label="Time Limit"
        type="number"
        variant="outlined"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
        value={timeLimit}
        onChange={handleTimeLimitChange}
        sx={{ width: "100%" }}
        InputProps={{
          inputProps: {
            min: 1,
          },
        }}
      ></MyTextFields>
      <MyTextFields
        id="outlined-password-input"
        label="Distance Limit(km)"
        type="number"
        variant="outlined"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
        InputProps={{
          inputProps: {
            min: 1,
          },
        }}
        value={distanceLimit}
        onChange={handleDistanceLimitChange}
        sx={{ width: "100%" }}
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
              onClick={addingVendors}
            ></MyButton>
          ) : (
            <MyButton
              label="Edit"
              variant="contained"
              sx={{ width: 120, height: "40px" }}
              onClick={editVendors}
            ></MyButton>
          )}
        </div>
      </Box>
    </div>
  );
}
