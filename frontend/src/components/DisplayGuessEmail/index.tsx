import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export function DisplayGuessEmail({ usersArray, ...props }) {
  return (
    <div>
      {usersArray.length == 0 ? (
        ""
      ) : (
        <div
          style={{
            width: "93%",
            maxHeight: 233,
            border: "solid 1px rgba(128,128,128,0.5)",
            borderRadius: "5.62px",
            marginTop: 16,
            overflowY: "auto",
            padding: "6px 16px",
          }}
        >
          {usersArray.map((item) => (
            <div
              style={{ display: "flex", alignItems: "center" }}
              key={item.id}
            >
              <p style={{ width: "90%" }}>{item.email}</p>
              <DeleteIcon
                color="disabled"
                style={{ cursor: "pointer" }}
              ></DeleteIcon>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
