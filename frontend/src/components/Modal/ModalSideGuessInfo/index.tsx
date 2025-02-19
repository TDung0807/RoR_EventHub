import React from "react";
import { Modal, Box } from "@mui/material";
import { VendorModal } from "../VendorModal";
import { HotelModal } from "../HotelModal";
import { LunchBoxModal } from "../LunchBoxModal";
import { RestaurantModal } from "../RestaurantModal";
import { TransportModal } from "../TransportModal";
export const ModalSideGuessinfo = ({
  open,
  handleClose,
  option = "Transport",
  action = "Add",
  mainDataId = 1,
  data = null,
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
        {option == "Restaurant" && (
          <RestaurantModal
            data={data}
            action={action}
            handleClose={handleClose}
          />
        )}
        {option == "Hotel" && (
          <HotelModal
            data={data}
            action={action}
            handleClose={handleClose}
          ></HotelModal>
        )}
        {option == "Transport" && (
          <TransportModal
            data={data}
            action={action}
            handleClose={handleClose}
            mainDataId={mainDataId}
          ></TransportModal>
        )}
        {option == "Vendor" && (
          <VendorModal
            data={data}
            action={action}
            handleClose={handleClose}
          ></VendorModal>
        )}
        {option == "Fnb" && (
          <RestaurantModal
            data={data}
            action={action}
            handleClose={handleClose}
          />
        )}
      </Box>
    </Modal>
  );
};
