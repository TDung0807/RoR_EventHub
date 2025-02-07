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

export function GuessGroupModal({
  open,
  handleChangingGuessList,
  action,
  handleClose,
  data,
  ...props
}) {
  const [description, setDecription] = useState(
    data != null && data.description ? data.description : ""
  );

  const [groupName, setGroupName] = useState(
    data != null && data.groupName ? data.groupName : ""
  );

  const handleChangedDescription = (event) => setDecription(event.target.value);
  const handleChangedGroupName = (event) => setGroupName(event.target.value);
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
            label="Description"
            value={description}
            onChange={handleChangedDescription}
            multiline
            rows={3}
            sx={{ mb: 3 }}
          />
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
        </Box>
      </Modal>
    </div>
  );
}
