import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { MyButton, MyTextFields, DisplayGuessEmail } from "../../index";
import { getGuestByName } from "../../../service/Guess";
import { useQuery } from "react-query";

export function ModalGuestList({
  open,
  handleClose,
  isCreated,
  handleCreated = () => {},
  urlBack = "",
  ...props
}) {
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
  const [guestEmail, setGuestEmail] = useState("");
  const [guestName, setGuestName] = useState("");
  const [shouldFetchGuest, setShouldFetchGuest] = useState(false);

  const {
    data: guestResult,
    isError: guestIsError,
    isLoading: guestIsLoading,
  } = useQuery(
    ["guessTaking", guestName],
    () =>
      //@ts-ignore
      getGuestByName(guestName),
    {
      enabled: shouldFetchGuest, // Only run the query when shouldFetchGuest is true
      onSettled: () => setShouldFetchGuest(false), // Reset after query is done
    }
  );

  const addingGuestToGroup = () => {
    setShouldFetchGuest(true); // Trigger the query
  };

  // Handle loading and error states
  if (guestIsLoading) {
    return <div>Loading...</div>;
  }

  if (guestIsError) {
    return <div>Error loading data. Please try again.</div>;
  }

  const usersArr = [
    { id: 1, email: "Jack97@gmail.com" },
    { id: 2, email: "Jack97@gmail.com" },
    { id: 3, email: "Jack97@gmail.com" },
    { id: 4, email: "Jack97@gmail.com" },
    { id: 5, email: "Jack97@gmail.com" },
    { id: 6, email: "Jack97@gmail.com" },
    { id: 7, email: "Jack97@gmail.com" },
    { id: 8, email: "Jack97@gmail.com" },
    { id: 9, email: "Jack97@gmail.com" },
  ];
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
              className="numbering-place"
            >
              <h2> Guess List</h2>
              <div
                style={{
                  backgroundColor: "#F1F9FF",
                  marginLeft: 24,
                  borderRadius: "50%",
                  width: 44,
                  height: 44,
                }}
              >
                <p
                  style={{
                    color: "#005FB3",
                    fontWeight: 700,
                    margin: 0,
                    textAlign: "center",
                    paddingTop: "23%",
                    height: "100%",
                  }}
                >
                  {usersArr.length}
                </p>
              </div>
            </div>
          </div>

          <MyTextFields
            id="outlined-password-input"
            label="Guess Email"
            type="email"
            variant="outlined"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "20px",
            }}
            value={guestEmail}
            onChange={(event) => {
              setGuestEmail(event.target.value);
            }}
            sx={{ width: "100%" }}
            {...props}
          ></MyTextFields>
          <MyTextFields
            id="outlined-password-input"
            label="Guess Name"
            type="email"
            variant="outlined"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "20px",
            }}
            value={guestName}
            onChange={(event) => {
              setGuestName(event.target.value);
            }}
            sx={{ width: "100%" }}
            {...props}
          ></MyTextFields>
          <MyButton
            label="Add Guess"
            sx={{ width: "100%" }}
            variant="contained"
            onClick={addingGuestToGroup}
          ></MyButton>
          <DisplayGuessEmail usersArray={usersArr}></DisplayGuessEmail>
          <div
            className="btn_created"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <MyButton
              label="Close"
              variant="outlined"
              sx={{ width: 120, height: "40px" }}
              style={{ marginRight: 12 }}
              onClick={handleClose}
            ></MyButton>
            {isCreated ? (
              <MyButton
                label="Created"
                variant="contained"
                sx={{ width: 120, height: "40px" }}
                onClick={handleCreated}
              ></MyButton>
            ) : (
              ""
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
