import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

export const ModalEvent = ({
  open,
  setOpen,
  detailEventData,
  action = "detail",
  onEditModal,
}) => {
  const handleClose = () => setOpen(false);
  const handleEditButton = () => {
    onEditModal(detailEventData);
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
              <IconButton>
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
                defaultValue={detailEventData.label}
                required
                fullWidth
                variant="outlined"
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="From"
                  type="time"
                  defaultValue={detailEventData.startHour.split(" ")[0]}
                  required
                  fullWidth
                />
                <TextField
                  label="To"
                  type="time"
                  defaultValue={detailEventData.endHour.split(" ")[0]}
                  required
                  fullWidth
                />
              </Box>
              <TextField
                label="Date"
                type="date"
                defaultValue={detailEventData.date}
                required
                fullWidth
              />
              <TextField
                label="Participants"
                placeholder="Enter event title"
                fullWidth
                defaultValue={detailEventData.user}
                variant="outlined"
              />
              <TextField
                label="Location"
                placeholder="Enter event title"
                fullWidth
                defaultValue={detailEventData.location}
                variant="outlined"
              />
              <TextField
                label="Description"
                placeholder="Enter Description"
                multiline
                rows={3}
                fullWidth
                variant="outlined"
              />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Button onClick={handleClose} variant="text">
                  Cancel
                </Button>
                <Button variant="contained" color="primary">
                  Save
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
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField label="From" type="time" required fullWidth />
                <TextField label="To" type="time" required fullWidth />
              </Box>
              <TextField label="Date" type="date" required fullWidth />
              <TextField
                label="Participants"
                placeholder="Enter event title"
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Location"
                placeholder="Enter event title"
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Description"
                placeholder="Enter Description"
                multiline
                rows={3}
                fullWidth
                variant="outlined"
              />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Button onClick={handleClose} variant="text">
                  Cancel
                </Button>
                <Button variant="contained" color="primary">
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};
