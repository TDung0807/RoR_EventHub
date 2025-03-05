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
import { MyButton, MyTextFields } from "../../../components";
import { createdGroup } from "../../../service/GuessGroup";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "react-query";
import { getHotels } from "../../../service/Hotel";
import { getAllTranspost } from "../../../service/Transport";
import { getRestaurants } from "../../../service/Restaurant";
import { getAllEvent } from "../../../service/Event";

import { toast } from "react-toastify";
const formatTime = (isoString) => {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Force the 13, 14, ... hours format
  const formattedHours = hours.toString().padStart(2, "0");

  return `${formattedHours}:${minutes} ${ampm}`;
};
export function GuessGroupModal({
  open,
  handleChangingGuessList = (id) => {},
  action,
  handleClose,
  basedData,
  refetchFunc = () => {},
}) {
  const [description, setDescription] = useState("");
  const [groupName, setGroupName] = useState("");
  const [remarkDished, setRemarkDished] = useState("");
  const [remarkHotel, setRemarkHotel] = useState("");
  const [remarkTransport, setRemarkTransport] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [transportId, setTransportId] = useState("");
  const [restaurantId, setRestauranttId] = useState("");
  const [eventId, setEventId] = useState("");

  // Fetch Hotels & Transports
  const {
    data: hotelsRawsData,
    isError: hotelIsError,
    isLoading: hotelIsLoading,
  } = useQuery(["hotelsTaking"], getHotels);
  const {
    data: eventRawsData,
    error: eventIsError,
    isLoading: eventIsLoading,
  } = useQuery(["allEvent"], getAllEvent);
  const {
    data: transportRawsData,
    isError: transportIsError,
    isLoading: transportIsLoading,
  } = useQuery(["transportsTaking"], getAllTranspost);
  const {
    data: restaurantRawsData,
    isError: restauranttIsError,
    isLoading: restaurantIsLoading,
  } = useQuery(["restaurantTaking"], getRestaurants);

  // Xử lý trạng thái loading & error
  const isLoading =
    hotelIsLoading ||
    transportIsLoading ||
    restaurantIsLoading ||
    eventIsLoading;
  const isError =
    hotelIsError || transportIsError || restauranttIsError || eventIsError;

  // Lấy danh sách Hotels & Transports từ API
  const hotelsData = hotelsRawsData?.data?.hotels || [];
  const transportData = transportRawsData?.data?.transports || [];
  const restaurantData = restaurantRawsData?.data?.restaurants || [];
  const eventData = eventRawsData?.data || [];

  // Cập nhật dữ liệu khi basedData thay đổi
  useEffect(() => {
    if (basedData) {
      setDescription(basedData.description || "");
      setGroupName(basedData.groupName || "");
      setHotelId(basedData.hotel_id || "");
      setTransportId(basedData.transport_id || "");
      setRestauranttId(basedData.restaurant_id || "");
      setEventId(basedData.event_id || "");
    }
  }, [basedData]);

  const handleChangedDescription = (event) =>
    setDescription(event.target.value);
  const handleChangedGroupName = (event) => setGroupName(event.target.value);

  const { mutateAsync } = useMutation({ mutationFn: createdGroup });

  const addingGroup = async () => {
    const payload = {
      group: {
        event_id: eventId,
        description,
        group: groupName,
        hotel_id: hotelId,
        transport_id: transportId,
        restaurant_id: restaurantId,
        hotel_remark: remarkHotel,
        transport_remark: remarkTransport,
        dish_remark: remarkDished,
        groupStatus: "Available",
        quantity: 0,
      },
    };
    const result = await mutateAsync(payload);
    refetchFunc();
    return result;
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
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        {/* Header */}
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

        {/* Hiển thị Loading/Error */}
        {isLoading && <Typography>Loading...</Typography>}
        {isError && (
          <Typography color="error">
            Error loading data. Please try again.
          </Typography>
        )}

        {/* Form */}
        {!isLoading && !isError && (
          <>
            <MyTextFields
              label="Group Name"
              type="text"
              variant="outlined"
              value={groupName}
              onChange={handleChangedGroupName}
              fullWidth
              sx={{ mb: 2 }}
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

            {/* Dropdown chọn Hotel */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Hotel</InputLabel>
              <Select
                value={hotelId}
                onChange={(e) => setHotelId(e.target.value)}
              >
                {hotelsData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Dropdown chọn Transport */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Transport</InputLabel>
              <Select
                value={transportId}
                onChange={(e) => setTransportId(e.target.value)}
              >
                {transportData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.transport_type} - {item.brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Restaurant</InputLabel>
              <Select
                value={restaurantId}
                onChange={(e) => setRestauranttId(e.target.value)}
              >
                {restaurantData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Event</InputLabel>
              <Select
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
              >
                {eventData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Add Guess List */}
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontSize: 16,
                color: "#0062B8",
                cursor: "pointer",
                mt: 2,
              }}
              onClick={async () => {
                try {
                  let guessGroupData = await addingGroup();
                  handleChangingGuessList(guessGroupData.data.id);
                  toast("Adding GuessGroup Successfully", {
                    autoClose: 3000,
                    type: "success",
                  });
                  handleClose();
                } catch {
                  toast("Adding GuessGroup Failure", {
                    autoClose: 3000,
                    type: "error",
                  });
                }
              }}
            >
              + Add Guest List (Optional)
            </Typography>

            {/* Buttons */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <MyButton
                label="Close"
                variant="outlined"
                sx={{ width: 120, height: "40px", mr: 2 }}
                onClick={handleClose}
              />
              <MyButton
                label={action === "Add" ? "Add" : "Edit"}
                variant="contained"
                sx={{ width: 120, height: "40px" }}
                onClick={
                  action === "Add"
                    ? () => {
                        try {
                          addingGroup();
                          toast("Adding Succesfully", {
                            autoClose: 3000,
                            type: "success",
                          });
                          handleClose();
                        } catch {
                          toast("Adding Failure", {
                            autoClose: 3000,
                            type: "error",
                          });
                        }
                      }
                    : handleClose
                }
              />
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}
