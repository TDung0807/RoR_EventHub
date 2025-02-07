import React from "react";
import { Modal, Box } from "@mui/material";
import { TransportTypeModal } from "../TransportTypeModal";
import { HotelTypeModal } from "../HotelTypeModal";

export function OtherSideModal({
  open,
  handleClose,
  option = "Transport",
  action = "Add",
}) {
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
        {option == "Hotel" && (
          <HotelTypeModal
            data={null}
            action={action}
            handleClose={handleClose}
          ></HotelTypeModal>
        )}
        {option == "Transport" && (
          <TransportTypeModal
            data={null}
            action={action}
            handleClose={handleClose}
          ></TransportTypeModal>
        )}
      </Box>
    </Modal>
  );
}
