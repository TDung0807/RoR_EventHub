import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { MyButton, MyTextFields, DisplayGuessEmail } from "../../index";
import {
  getGuestByName,
  getAllGuessFromGroup,
  addGuestsToGroup,
  getGuestByEmail,
  createdGuest,
} from "../../../service/Guess";
import { registerFunc } from "../../../service/User";
import { useMutation } from "@tanstack/react-query";

import { useQuery } from "react-query";
import { toast } from "react-toastify";
const generatePassword = (guestName) => {
  const random = Math.floor(Math.random() * 1000) + 1;
  return `${guestName}${random}`;
};

export function ModalGuestList({
  open,
  handleClose,
  isCreated,
  handleCreated = () => {},
  urlBack = "",
  idGuessGroup,
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
  const [shouldFetchGuestEmail, setShouldFetchGuestEmail] = useState(false);
  const [shouldFetchGuestName, setShouldFetchGuestName] = useState(false);

  const { mutateAsync: addGuestToGroup } = useMutation({
    mutationFn: addGuestsToGroup,
  });
  const { mutateAsync: registerService } = useMutation({
    mutationFn: registerFunc,
  });
  const { mutateAsync: createGuestService } = useMutation({
    mutationFn: createdGuest,
  });

  const {
    data: guestInGroup,
    isError: guest1InGroupIsError,
    isLoading: guest1InGroupIsLoading,
    refetch: refetchGuestInGroup,
  } = useQuery(["guestIngroup", idGuessGroup], getAllGuessFromGroup);
  const {
    data: guestResult2,
    isError: guest2IsError,
    isLoading: guest2IsLoading,
  } = useQuery(
    ["guessTakingEmail", guestEmail],
    () =>
      //@ts-ignore
      getGuestByEmail(guestEmail),
    {
      enabled: shouldFetchGuestEmail, // Only run the query when shouldFetchGuest is true
      onSettled: () => setShouldFetchGuestEmail(false), // Reset after query is done
    }
  );
  const {
    data: guestResult1,
    isError: guest1IsError,
    isLoading: guest1IsLoading,
  } = useQuery(
    ["guessTakingName", guestName],
    () =>
      //@ts-ignore
      getGuestByName(guestName),
    {
      enabled: shouldFetchGuestName, // Only run the query when shouldFetchGuest is true
      onSettled: () => setShouldFetchGuestName(false), // Reset after query is done
    }
  );

  // Handle loading and error states
  if (guest1IsLoading || guest1InGroupIsLoading || guest2IsLoading) {
    return <div>Loading...</div>;
  }

  if (guest1IsError || guest1InGroupIsError || guest2IsError) {
    return <div>Error loading data. Please try again.</div>;
  }
  const usersArr = guestInGroup?.data?.quests || [];

  const addingGuestToGroup = async () => {
    await setShouldFetchGuestEmail(true); // Trigger the query
    await setShouldFetchGuestName(true); // Trigger the query
    setTimeout(() => {}, 2000);
    const guessData = (await guestResult1?.data?.quest) ||
      (await guestResult2?.data?.quest) || { id: null };
    console.log(guessData);
    try {
      if (guessData.id != null) {
        let resultAddGroup = await addGuestToGroup({
          group_id: idGuessGroup,
          quest_ids: [guessData.id],
        });

        toast("Adding New Guest Successfully", { type: "success" });
        refetchGuestInGroup();
      } else {
        let resultAddGuest = await createGuestService({
          name: guestName,
          email: guestEmail,
          phone: "0903829122",
        });
        let guessDataId;
        try {
          guessDataId = await resultAddGuest.data.quest.id;
        } catch {
          guessDataId = await resultAddGuest.data.id;
        }
        let resultAddGroup = await addGuestToGroup({
          group_id: idGuessGroup,
          quest_ids: [guessDataId],
        });
        let resultRegister = await registerService({
          user: {
            username: guestEmail,
            name: guestName,
            role: 0,
            password: generatePassword(guestEmail.split("@")[0]),
            email: guestEmail,
          },
        });
        toast("Adding New Guest Successfully with default value", {
          type: "success",
        });

        refetchGuestInGroup();
      }
    } catch {
      toast("Adding Failure", {
        type: "error",
      });
    }
  };
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
              <h2 style={{ marginBottom: 24 }}> Guest List</h2>
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
          <DisplayGuessEmail
            idGuessGroup={idGuessGroup}
            refetchFunc={refetchGuestInGroup}
            usersArray={usersArr}
          ></DisplayGuessEmail>
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
