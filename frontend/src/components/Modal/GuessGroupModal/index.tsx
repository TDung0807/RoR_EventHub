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
import { createdGroup } from "../../../service/GuessGroup";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "react-query";
import { getHotels } from "../../../service/Hotel";
import { getAllTranspost } from "../../../service/Transport";

export function GuessGroupModal({
  open,
  handleChangingGuessList,
  action,
  handleClose,
  basedData,
  ...props
}) {
  const [description, setDescription] = useState("");
  const [groupName, setGroupName] = useState("");
  const [remarkDished, setRemarkDished] = useState("");
  const [remarkHotel, setRemarkHotel] = useState("");
  const [remarkTransport, setRemarkTransport] = useState("");
  const [hotelId, setHotelId] = useState("0");
  const [transportId, setTransportId] = useState("0");

  // Call the hooks unconditionally
  const {
    data: hotelsRawsData,
    isError: hotelIsError,
    isLoading: hotelIsLoading,
  } = useQuery(["hotelsTaking"], getHotels);

  const {
    data: transportRawsData,
    isError: transportIsError,
    isLoading: transportIsLoading,
  } = useQuery(["transportsTaking"], getAllTranspost);

  // Handle loading states
  if (hotelIsLoading || transportIsLoading) {
    return <div>Loading...</div>;
  }

  if (hotelIsError || transportIsError) {
    return <div>Error loading data. Please try again.</div>;
  }

  const hotelsData = hotelsRawsData?.data?.hotels || [];
  const transportData = transportRawsData?.data?.transports || [];
  console.log(transportData);
  useEffect(() => {
    if (basedData) {
      setDescription(basedData.description || "");
      setGroupName(basedData.groupName || "");
      setHotelId(basedData.hotel_id || "");
      setTransportId(basedData.transport_id || "");
    }
  }, [basedData]); // Runs when `data` changes

  const handleChangedDescription = (event) =>
    setDescription(event.target.value);
  const handleChangedGroupName = (event) => setGroupName(event.target.value);
  const { mutateAsync } = useMutation({
    mutationFn: createdGroup,
  });

  const addingGroup = () => {
    console.log({
      description: description,
      group: groupName,
      hotel_id: hotelId,
      transport_id: transportId,
      hotel_remark: remarkHotel,
      transport_remark: remarkTransport,
      dish_remark: remarkDished,
      groupStatus: "Available",
      quantity: 0,
    });
    const result = mutateAsync({
      description: description,
      group: groupName,
      hotel_id: hotelId,
      transport_id: transportId,
      hotel_remark: remarkHotel,
      transport_remark: remarkTransport,
      dish_remark: remarkDished,
      groupStatus: "Available",
      quantity: 2,
    });
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography color="#4C4A4A" variant="h6" fontWeight="bold">
              Group {action}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <MyTextFields
            id="outlined-password-input"
            label="Group Name"
            type="text"
            variant="outlined"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "20px",
            }}
            value={groupName}
            onChange={handleChangedGroupName}
            sx={{ width: "100%" }}
          ></MyTextFields>

          <TextField
            fullWidth
            label="Hotel Remark"
            value={remarkHotel}
            onChange={(event) => {
              setRemarkHotel(event.target.value);
            }}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Transport Remake"
            value={remarkTransport}
            onChange={(event) => {
              setRemarkTransport(event.target.value);
            }}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Dish Remark"
            value={remarkDished}
            onChange={(event) => {
              setRemarkDished(event.target.value);
            }}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={handleChangedDescription}
            multiline
            rows={3}
            sx={{ mb: 3 }}
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="mainInter-label">Hotel</InputLabel>
            <Select
              required
              labelId="mainInter-label"
              value={transportId}
              onChange={(e) => {
                setTransportId(e.target.value);
              }}
            >
              {hotelsData.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="mainInter-label">Transport</InputLabel>
            <Select
              required
              labelId="mainInter-label"
              value={hotelId}
              onChange={(e) => {
                setHotelId(e.target.value);
              }}
            >
              {transportData.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.transport_type} - {item.brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <p
            style={{
              fontFamily: "Montserrat",
              fontSize: 16,
              color: "#0062B8",
              cursor: "pointer",
            }}
            onClick={handleChangingGuessList}
          >
            + Add Guess List (Optional)
          </p>
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
                  onClick={addingGroup}
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
        </Box>
      </Modal>
    </div>
  );
}
