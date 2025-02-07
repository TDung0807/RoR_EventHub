import React from "react";
import { Modal, Box } from "@mui/material";
import { TransportModal } from "../TransportModal";
import { HotelModal } from "../HotelModal";
import { LunchBoxModal } from "../LunchBoxModal";
import { RestaurantModal } from "../RestaurantModal";
export const ModalSideGuessinfo = ({
  open,
  handleClose,
  option = "Transport",
  action = "Add",
}) => {
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
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        {/* Header */}
        {option == "Lunchbox" && (
          <LunchBoxModal
            data={null}
            action={action}
            handleClose={handleClose}
          />
        )}
        {option == "Hotel" && (
          <HotelModal
            data={null}
            action={action}
            handleClose={handleClose}
          ></HotelModal>
        )}
        {option == "Transport" && (
          <TransportModal
            data={null}
            action={action}
            handleClose={handleClose}
          ></TransportModal>
        )}
        {option == "Fnb" && (
          <RestaurantModal
            data={null}
            action={action}
            handleClose={handleClose}
          />
        )}
      </Box>
    </Modal>
  );
};
