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
import { useQuery } from "react-query";
import { getAllEvent } from "../../../service/Event";
const formatTime = (isoString) => {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Force the 13, 14, ... hours format
  const formattedHours = hours.toString().padStart(2, "0");

  return `${formattedHours}:${minutes} ${ampm}`;
};
export function CalendarPage() {
  const [open, setOpen] = useState(false);
  const [detailEventData, setDetailEventData] = useState(null);
  const [action, setAction] = useState("");
  const handleOpen = () => setOpen(true);
  const { data, error, isError, isLoading, refetch } = useQuery(
    ["upcomingEvent"],
    getAllEvent,
    { staleTime: 0 }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  let eventsData;
  try {
    // Chuyển đổi dữ liệu
    eventsData = data.data.map((event) => ({
      id: `${event.id}`,
      label: `${event.label}`,
      groupLabel: "Event",
      startHour: formatTime(event.startHour),
      endHour: formatTime(event.endHour),
      date: event.date.split("T")[0], // Lấy phần ngày
      location: event.location,
      description: event.description || "",
      user: "Admin",
    }));
  } catch {
    // Chuyển đổi dữ liệu
    eventsData = data.data.events.map((event) => ({
      id: `${event.id}`,
      label: `${event.label} & ${formatTime(event.startHour)} - ${formatTime(
        event.endHour
      )}`,
      groupLabel: "Event",
      startHour: formatTime(event.startHour),
      endHour: formatTime(event.endHour),
      date: event.date.split("T")[0], // Lấy phần ngày
      location: event.location,
      description: event.description || "",
      user: "Admin",
    }));
  }

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
        refetch={refetch}
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
            <Typography
              fontWeight={700}
              fontFamily={"Montserrat"}
              color="#005FB3"
              variant="h4"
              marginBottom={0}
            >
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
            events={eventsData}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
