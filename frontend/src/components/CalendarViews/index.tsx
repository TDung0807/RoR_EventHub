import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Scheduler from "react-mui-scheduler";
import { ModalEvent } from "components/Modal/ModalEvent";

export const CalendarView = ({ events, onClickEventFunc = (item) => {} }) => {
  // Hàm chuyển đổi thời gian ISO thành định dạng 12 giờ (AM/PM)

  const config = {
    options: {
      transitionMode: "zoom", // or fade
      startWeekOn: "mon", // or sun
      defaultMode: "month", // or week | day | timeline
      minWidth: 540,
      maxWidth: 540,
      minHeight: 540,
      maxHeight: 540,
    },
    alertProps: {
      open: false,
      color: "info", // info | success | warning | error
      severity: "info", // info | success | warning | error
      message: "",
      showActionButton: true,
      showNotification: true,
      delay: 1500,
    },
    toolbarProps: {
      showSearchBar: true,
      showSwitchModeButtons: true,
      showDatePicker: true,
    },
  };
  const handleEventClick = (events, item) => {
    onClickEventFunc(item);
  };
  const handleEventsChange = (item) => {
    console.log(item);
  };
  return (
    <Scheduler
      locale="en"
      events={events}
      legacyStyle={false}
      options={config.options}
      alertProps={config.alertProps}
      toolbarProps={config.toolbarProps}
      onEventsChange={handleEventsChange}
      // onCellClick={handleCellClick}
      onTaskClick={handleEventClick}
      // onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
    />
  );
};
