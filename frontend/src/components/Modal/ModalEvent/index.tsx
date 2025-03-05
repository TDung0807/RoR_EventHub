import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Input,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { addEvent, putEvent, deleteEvent } from "../../../service/Event";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const ModalEvent = ({
  open,
  setOpen,
  refetch,
  detailEventData,
  action = "detail",
  onEditModal,
}) => {
  const [eventName, setEventName] = useState("");
  const [eventFrom, setEventFrom] = useState("");
  const [eventTo, setEventTo] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventParticipants, setEventParticipants] = useState(1);
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    if (detailEventData) {
      setId(detailEventData.id || "");
      setEventName(detailEventData.label || "");

      setEventFrom(
        detailEventData.startHour
          ? () => {
              const date = new Date(detailEventData.startHour);
              const hours = String(date.getHours()).padStart(2, "0");
              const minutes = String(date.getMinutes()).padStart(2, "0");
              return `${hours}:${minutes}`;
            }
          : ""
      );
      setEventTo(
        detailEventData.endHour
          ? () => {
              const date = new Date(detailEventData.endHour);
              const hours = String(date.getHours()).padStart(2, "0");
              const minutes = String(date.getMinutes()).padStart(2, "0");
              return `${hours}:${minutes}`;
            }
          : ""
      );
      setEventDate(detailEventData.date || "");
      setEventParticipants(detailEventData.participants ?? 1); // Ensuring 1 as default
      setEventLocation(detailEventData.location || "");
      setEventDescription(detailEventData.description || "");
    }
  }, [detailEventData]); // Runs when `detailEventData` changes

  const handleClose = () => setOpen(false);
  const handleEditButton = () => {
    onEditModal(detailEventData);
  };
  const { mutateAsync: addingEventSer } = useMutation({ mutationFn: addEvent });
  const { mutateAsync: editEventSer } = useMutation({ mutationFn: putEvent });
  const { mutateAsync: deleteEventSer } = useMutation({
    mutationFn: deleteEvent,
  });

  const addingEvent = async () => {
    try {
      const result = await addingEventSer({
        label: eventName,
        start_hour: eventFrom,
        end_hour: eventTo,
        date: eventDate,
        participants: eventParticipants,
        location: eventLocation,
        description: eventDescription,
      });
      if (
        result.status != 404 &&
        result.status != 500 &&
        result.status != 422
      ) {
        toast("Thêm thành công", {
          autoClose: 3000,
          type: "success",
        });
        refetch();
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
  const editEvent = async () => {
    try {
      const result = await editEventSer({
        id: id,
        label: eventName,
        start_hour: eventFrom,
        end_hour: eventTo,
        date: eventDate,
        participants: eventParticipants,
        location: eventLocation,
        description: eventDescription,
      });
      if (
        result.status != 404 &&
        result.status != 500 &&
        result.status != 422
      ) {
        toast("Sửa thành công", {
          autoClose: 3000,
          type: "success",
        });
        refetch();
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
  const deleteEventHandle = async () => {
    try {
      const result = await deleteEventSer(id);
      if (
        //@ts-ignore
        result.status != 404 &&
        //@ts-ignore
        result.status != 500 &&
        //@ts-ignore
        result.status != 422
      ) {
        toast("Xóa thành công", {
          autoClose: 3000,
          type: "success",
        });
        refetch();
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
  return (
    <>
      {action == "detail" && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "white",
              boxShadow: 24,
              borderRadius: 2,
              p: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">{detailEventData.label}</Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              🕒 {detailEventData.startHour} - {detailEventData.endHour}
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              📅 {detailEventData.date}
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              👤 {detailEventData.user}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: 2,
              }}
            >
              <IconButton onClick={handleEditButton}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={deleteEventHandle}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Modal>
      )}
      {action == "edit" && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "white",
              boxShadow: 24,
              borderRadius: 2,
              p: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Edit event</Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Event Name"
                required
                fullWidth
                variant="outlined"
                value={eventName}
                onChange={(e) => {
                  setEventName(e.target.value);
                }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  value={eventFrom}
                  placeholder="From"
                  type="time"
                  required
                  fullWidth
                  onChange={(e) => {
                    setEventFrom(e.target.value);
                  }}
                />
                <TextField
                  value={eventTo}
                  placeholder="To"
                  type="time"
                  required
                  fullWidth
                  onChange={(e) => {
                    setEventTo(e.target.value);
                  }}
                />
              </Box>
              <TextField
                value={eventDate}
                placeholder="Date"
                type="date"
                required
                fullWidth
                onChange={(e) => {
                  setEventDate(e.target.value);
                }}
              />
              <TextField
                value={eventParticipants}
                type="number"
                label="Participants"
                placeholder="Enter Number of Participants"
                fullWidth
                variant="outlined"
                onChange={(e) => {
                  setEventParticipants(Number.parseInt(e.target.value));
                }}
              />
              <TextField
                value={eventLocation}
                label="Location"
                placeholder="Enter event Location"
                fullWidth
                variant="outlined"
                onChange={(e) => {
                  setEventLocation(e.target.value);
                }}
              />
              <TextField
                value={eventDescription}
                label="Description"
                placeholder="Enter Description"
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                onChange={(e) => {
                  setEventDescription(e.target.value);
                }}
              />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Button onClick={handleClose} variant="text">
                  Cancel
                </Button>
                <Button onClick={editEvent} variant="contained" color="primary">
                  Edit
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
      {action == "add" && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "white",
              boxShadow: 24,
              borderRadius: 2,
              p: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Adding event</Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Event Name"
                required
                fullWidth
                variant="outlined"
                value={eventName}
                onChange={(e) => {
                  setEventName(e.target.value);
                }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  value={eventFrom}
                  placeholder="From"
                  type="time"
                  required
                  fullWidth
                  onChange={(e) => {
                    setEventFrom(e.target.value);
                  }}
                />
                <TextField
                  value={eventTo}
                  placeholder="To"
                  type="time"
                  required
                  fullWidth
                  onChange={(e) => {
                    setEventTo(e.target.value);
                  }}
                />
              </Box>
              <TextField
                value={eventDate}
                placeholder="Date"
                type="date"
                required
                fullWidth
                onChange={(e) => {
                  setEventDate(e.target.value);
                }}
              />
              <TextField
                value={eventParticipants}
                type="number"
                label="Participants"
                placeholder="Enter Number of Participants"
                fullWidth
                variant="outlined"
                onChange={(e) => {
                  setEventParticipants(Number.parseInt(e.target.value));
                }}
              />
              <TextField
                value={eventLocation}
                label="Location"
                placeholder="Enter event Location"
                fullWidth
                variant="outlined"
                onChange={(e) => {
                  setEventLocation(e.target.value);
                }}
              />
              <TextField
                value={eventDescription}
                label="Description"
                placeholder="Enter Description"
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                onChange={(e) => {
                  setEventDescription(e.target.value);
                }}
              />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Button onClick={handleClose} variant="text">
                  Cancel
                </Button>
                <Button
                  onClick={addingEvent}
                  variant="contained"
                  color="primary"
                >
                  Adding
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};
