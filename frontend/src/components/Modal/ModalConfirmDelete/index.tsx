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
import { MyButton } from "../../index";
import CloseIcon from "@mui/icons-material/Close";

export function DeleteModal({ open, handleClose, handleDelete, ...props }) {
  return (
    <div>
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
          ></Box>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6" style={{ textAlign: "center" }}>
              ⚠️Are you sure you want to proceed?
            </Typography>
            <p style={{ fontSize: 12, color: "#666666", marginLeft: 4 }}>
              This action is irreversible. Any data loss that impacts the
              company's profit could significantly affect your wallet and may
              lead to legal consequences. Please proceed with caution
            </p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={handleClose} variant="text">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleDelete();
                }}
                variant="contained"
                color="primary"
              >
                Delete
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
