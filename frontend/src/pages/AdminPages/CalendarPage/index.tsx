// Import necessary libraries
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { CalendarView, ModalEvent } from "../../../components";
import { fakeEventsData } from "../../../mockdata";
export function CalendarPage() {
  const [open, setOpen] = useState(false);
  const [detailEventData, setDetailEventData] = useState(null);
  const [action, setAction] = useState("");
  const handleOpen = () => setOpen(true);

  const onClickEventFunc = (item) => {
    handleOpen();
    setDetailEventData(item);
    setAction("detail");
  };
  const onEditModal = (item) => {
    handleOpen();
    setDetailEventData(item);
    setAction("edit");
  };
  const onCreatedModal = (item) => {
    handleOpen();
    setDetailEventData(null);
    setAction("add");
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ModalEvent
        detailEventData={detailEventData}
        open={open}
        setOpen={setOpen}
        action={action}
        onEditModal={onEditModal}
      ></ModalEvent>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
              borderBottom: "1px solid #ddd",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Calendar
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button variant="contained" onClick={onCreatedModal}>
                + Create Event
              </Button>
            </Box>
          </Box>
          <CalendarView
            onClickEventFunc={onClickEventFunc}
            events={fakeEventsData}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
