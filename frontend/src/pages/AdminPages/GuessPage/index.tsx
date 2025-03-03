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
  const { hash, pathname, search } = location;
  console.log(pathname);
  const [openGuessGroupModal, setOpenGuessGroupModal] = useState(false);
  const [openGuessListModal, setOpenGuessListModal] = useState(false);
  const [guessListId, setGuessListId] = useState({});
  if (isLoading) {
    return <div>Loading...</div>;
  }
  let groupData = !data ? [] : data.data.groups;

  const guessGroupRows = [
    "Group",
    "Group Status ",
    "Quantity",
    "Date Created ",
    "Last Update",
    "",
  ];
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().replace("T", " ").substring(0, 19);
  };

  const transformedData = groupData.map(
    ({ id, group, groupStatus, quantity, created_at, updated_at }) => ({
      id,
      group,
      groupStatus,
      quantity,
      created_at: formatDate(created_at),
      updated_at: formatDate(updated_at),
    })
  );
  return (
    <div>
      {openGuessGroupModal == true ? (
        <GuessGroupModal
          open={openGuessGroupModal}
          handleClose={() => {
            setOpenGuessGroupModal(false);
          }}
          basedData={[]}
          handleChangingGuessList={(guessListId) => {
            setGuessListId(guessListId);
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
          idGuessGroup={guessListId}
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
              Guest Group List
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenGuessGroupModal(true);
                }}
              >
                + Create Guest Group
              </Button>
            </Box>
          </Box>
          <MainTable
            editPre={`${pathname}`}
            editRef={true}
            utilityRows={guessGroupRows}
            utilityData={transformedData}
            action={["edit", "delete"]}
          />
        </Box>
      </Box>
    </div>
  );
};
