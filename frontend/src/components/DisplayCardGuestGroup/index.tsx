import React from "react";
import InfoIcon from "@mui/icons-material/Info";
interface DisplayCardGuestGroupProp {
  dateCreated: string;
  lastUpdated: string;
  description: string;
  [key: string]: any; // This allows for additional props not explicitly defined
}

export const DisplayCardGuestGroup: React.FC<DisplayCardGuestGroupProp> = ({
  dateCreated,
  lastUpdated,
  description,
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ scale: "1.4", paddingTop: 8, marginRight: 17 }}>
          <InfoIcon color="primary"></InfoIcon>
        </div>
        <div>
          <h2 style={{ margin: 0, color: "#005FB3" }}>General information</h2>
        </div>
      </div>
      <p>
        <strong>Date created:</strong> {dateCreated}
      </p>
      <p>
        <strong>Last updated:</strong> {lastUpdated}
      </p>
      <p>
        <strong>Description:</strong>
      </p>
      <p>{description}</p>
    </div>
  );
};
