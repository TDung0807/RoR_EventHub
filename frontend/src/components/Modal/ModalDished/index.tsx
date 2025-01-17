import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const ModalDished = ({
  open,
  setOpen,
  detailDishedData = null,
  action = "detail",
}) => {
  const handleClose = () => setOpen(false);
  return (
    <>
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
              <Typography variant="h6">Edit Dished</Typography>
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
                label="Dished Name"
                required
                fullWidth
                variant="outlined"
                value={detailDishedData.name}
              />
              <FormControl fullWidth>
                <InputLabel id="restaurant-label">Type</InputLabel>
                <Select
                  required
                  labelId="restaurant-label"
                  value={detailDishedData.type}
                >
                  <MenuItem value="BreakFast">BreakFast</MenuItem>
                  <MenuItem value="Lunch">Lunch</MenuItem>
                  <MenuItem value="Dinner">Dinner</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="mainInter-label">Main ingredient</InputLabel>
                <Select
                  required
                  labelId="mainInter-label"
                  value={detailDishedData.MainInter[0]}
                >
                  <MenuItem value="Pork">Pork</MenuItem>
                  <MenuItem value="Beef">Beef</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Price"
                value={detailDishedData.Price}
                required
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
              <Typography variant="h6">Adding Dished</Typography>
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
                label="Dished Name"
                required
                fullWidth
                variant="outlined"
              />
              <FormControl fullWidth>
                <InputLabel id="restaurant-label">Type</InputLabel>
                <Select required labelId="restaurant-label">
                  <MenuItem value="BreakFast">BreakFast</MenuItem>
                  <MenuItem value="Lunch">Lunch</MenuItem>
                  <MenuItem value="Dinner">Dinner</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="mainInter-label">Main ingredient</InputLabel>
                <Select required labelId="mainInter-label">
                  <MenuItem value="Pork">Pork</MenuItem>
                  <MenuItem value="Beef">Beef</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Price" required fullWidth variant="outlined" />
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
