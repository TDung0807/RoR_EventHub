import React from "react";
import { Modal, Box } from "@mui/material";
import { VendorModal } from "../VendorModal";
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
        {option == "Vendor" && (
          <VendorModal
            data={null}
            action={action}
            handleClose={handleClose}
          ></VendorModal>
        )}
      </Box>
    </Modal>
  );
}
