import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@tanstack/react-query";
import { deleteGuestsFromGroup } from "../../service/Guess";
export function DisplayGuessEmail({
  usersArray,
  refetchFunc,
  idGuessGroup,
  ...props
}) {
  const { mutateAsync } = useMutation({ mutationFn: deleteGuestsFromGroup });

  const deleteArr = async (idGuess) => {
    let result = await mutateAsync({
      group_id: idGuessGroup,
      quest_id: idGuess,
    });
    refetchFunc();
  };
  return (
    <div>
      {usersArray.length == 0 ? (
        ""
      ) : (
        <div
          style={{
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
              <p
                style={{
                  fontFamily: "Inter",
                  color: "#6B7280",
                  width: "95%",
                  margin: 0,
                }}
              >
                {item.email}
              </p>

              <DeleteIcon
                onClick={() => {
                  deleteArr(item.id);
                }}
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
