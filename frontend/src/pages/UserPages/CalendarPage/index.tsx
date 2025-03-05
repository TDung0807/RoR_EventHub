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
import { getEventsByUserEmail } from "../../../service/Event";
import { useAccountAuthetication } from "../../../store";

const formatTime = (isoString) => {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Force the 13, 14, ... hours format
  const formattedHours = hours.toString().padStart(2, "0");

  return `${formattedHours}:${minutes} ${ampm}`;
};
export function UserCalendar() {
  const email = useAccountAuthetication((state) => state.email);
  const { data, error, isError, isLoading } = useQuery(
    ["upcomingEvent", encodeURIComponent(email).replace(/\./g, "%2E")],
    getEventsByUserEmail,
    { staleTime: 0 }
  );
  const [open, setOpen] = useState(false);
  const [detailEventData, setDetailEventData] = useState(null);
  const [action, setAction] = useState("");
  const handleOpen = () => setOpen(true);
  let eventsData;
  try {
    // Chuyển đổi dữ liệu
    eventsData =
      data.data?.map((event) => ({
        id: `${event.id}`,
        label: `${event.label}`,
        groupLabel: "Event",
        startHour: formatTime(event.start_hour),
        endHour: formatTime(event.end_hour),
        date: event.date.split("T")[0], // Lấy phần ngày
        location: event.location,
        description: event.description || "",
        user: "Admin",
      })) || [];
  } catch {
    try {
      // Chuyển đổi dữ liệu
      eventsData =
        data.data?.events?.map((event) => ({
          id: `${event.id}`,
          label: `${event.label}`,
          groupLabel: "Event",
          startHour: formatTime(event.start_hour),
          endHour: formatTime(event.end_hour),
          date: event.date.split("T")[0], // Lấy phần ngày
          location: event.location,
          description: event.description || "",
          user: "Admin",
        })) || [];
    } catch {
      eventsData = [];
    }
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
