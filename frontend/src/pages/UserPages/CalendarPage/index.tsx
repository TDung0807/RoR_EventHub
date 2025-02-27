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
import { getEventsByUserId } from "../../../service/Event";
import { useAccountAuthetication } from "../../../store";

const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
export function UserCalendar() {
  const userId = useAccountAuthetication((state) => state.userId);
  const { data, error, isError, isLoading } = useQuery(
    ["upcomingEvent", userId],
    getEventsByUserId,
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
        startHour: formatTime(event.startHour),
        endHour: formatTime(event.endHour),
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
          label: `${event.label} & ${formatTime(
            event.startHour
          )} - ${formatTime(event.endHour)}`,
          groupLabel: "Event",
          startHour: formatTime(event.startHour),
          endHour: formatTime(event.endHour),
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
