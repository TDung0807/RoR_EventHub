import React from "react";
import { MyDataTable } from "../index";
import GroupIcon from "@mui/icons-material/Group";
interface DisplayGuestListGroupProps {
  [key: string]: any; // This allows for additional props not explicitly defined
}

export const DisplayGuestListGroup: React.FC<DisplayGuestListGroupProps> = ({
  columns,
  rows,
  paginationModel,
  ...props
}) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        marginLeft: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 20,
          marginLeft: 8,
        }}
      >
        <div style={{ scale: "1.4", paddingTop: 8, marginRight: 17 }}>
          <GroupIcon color="primary"></GroupIcon>
        </div>
        <div>
          <h2 style={{ margin: 0, color: "#005FB3" }}>Guest List</h2>
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
