import {
  MainTable,
  GuessGroupModal,
  ModalGuestList,
} from "../../../components";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./GuessPage.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { fakeGuessGroupData } from "../../../mockdata";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAllGroup } from "../../../service/GuessGroup";

export const AdminGuestPage = () => {
  const { data, error, isError, isLoading } = useQuery(
    ["guessgroups"],
    getAllGroup
  );
  const [openGuessGroupModal, setOpenGuessGroupModal] = useState(false);
  const [openGuessListModal, setOpenGuessListModal] = useState(false);
  const [guessListData, setGuessListData] = useState({});
  if (isLoading) {
    return <div>Loading...</div>;
  }
  let groupData = !data ? [] : data.data.groups;

  const guessGroupRows = [
    "Group",
    "Group Status ",
    "Date Created ",
    "Quantity",
    "Last Update",
    "",
  ];

  return (
    <div>
      {openGuessGroupModal == true ? (
        <GuessGroupModal
          open={openGuessGroupModal}
          handleClose={() => {
            setOpenGuessGroupModal(false);
          }}
          basedData={[]}
          handleChangingGuessList={(guessListData) => {
            setOpenGuessGroupModal(false);
            setOpenGuessListModal(true);
          }}
          action={"Add"}
        />
      ) : (
        ""
      )}
      {openGuessListModal == true ? (
        <ModalGuestList
          open={openGuessListModal}
          handleClose={() => {
            setOpenGuessListModal(false);
          }}
          isCreated={true}
        />
      ) : (
        ""
      )}
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
              borderBottom: "1px solid #ddd",
            }}
          >
            <Typography
              fontWeight={700}
              fontFamily={"Montserrat"}
              color="#005FB3"
              variant="h4"
              marginBottom={0}
            >
              Guess Group List
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenGuessGroupModal(true);
                }}
              >
                + Create Guess Group
              </Button>
            </Box>
          </Box>
          <MainTable
            editPre={`${location.pathname}`}
            editRef={true}
            utilityRows={guessGroupRows}
            utilityData={groupData}
            action={["edit", "delete"]}
          />
        </Box>
      </Box>
    </div>
  );
};
