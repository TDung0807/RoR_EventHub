import React from "react";
import { Modal, Box } from "@mui/material";
import { VendorModal } from "../VendorModal";
import { HotelTypeModal } from "../HotelTypeModal";
import { TransportModal } from "../TransportModal";

export function OtherSideModal({
  mainDataId = 1,
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
            mainDataId={mainDataId}
          ></HotelTypeModal>
        )}
        {option == "Vendor" && (
          <TransportModal
            data={null}
            action={action}
            handleClose={handleClose}
            mainDataId={mainDataId}
          ></TransportModal>
        )}
      </Box>
    </Modal>
  );
}
