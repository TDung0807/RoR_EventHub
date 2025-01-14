import React, { useState } from "react";
import { MyDataTable, ModalGuestList } from "../index";
import GroupIcon from "@mui/icons-material/Group";
import { displayPartsToString } from "typescript";
import AddIcon from "@mui/icons-material/Add";

interface DisplayGuestListGroupProps {
  [key: string]: any; // This allows for additional props not explicitly defined
}

export const DisplayGuestListGroup: React.FC<DisplayGuestListGroupProps> = ({
  columns,
  rows,
  paginationModel,
  ...props
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 506,
    borderRadius: "30px",
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        marginLeft: 80,
      }}
    >
      <ModalGuestList
        open={open}
        handleClose={handleClose}
        style={style}
        isCreated={false}
      ></ModalGuestList>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 20,
          marginLeft: 8,
        }}
      >
        <div
          className=""
          style={{
            display: "flex",
            alignItems: "center",
            width: "90%",
          }}
        >
          <div style={{ scale: "1.4", paddingTop: 8, marginRight: 17 }}>
            <GroupIcon color="primary"></GroupIcon>
          </div>
          <div>
            <h2 style={{ margin: 0, color: "#005FB3" }}>Guest List</h2>
          </div>
        </div>

        <div
          className=""
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleOpen}
        >
          <AddIcon color="primary"></AddIcon>
          <p style={{ margin: 0, color: "#005FB3", fontWeight: 700 }}>
            Add Guest
          </p>
        </div>
      </div>
      <MyDataTable
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
      />
    </div>
  );
};
