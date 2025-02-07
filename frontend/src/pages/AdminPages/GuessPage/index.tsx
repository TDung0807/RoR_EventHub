import { MainTable } from "../../../components";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./GuessPage.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { fakeGuessGroupData } from "../../../mockdata";
import React, { useState } from "react";

export const AdminGuestPage = () => {
  const navigate = useNavigate();

  const guessGroupRows = [
    "Group",
    "Group Status ",
    "Date Created ",
    "Quantity",
    "Last Update",
    "",
  ];

  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <div className={styles.topDivided}>
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
              <Button variant="contained">+ Create Guess Group</Button>
            </Box>
          </Box>
          <MainTable
            editPre={`${location.pathname}`}
            editRef={true}
            utilityRows={guessGroupRows}
            utilityData={fakeGuessGroupData}
            action={["edit", "delete"]}
          />
        </Box>
      </Box>
    </div>
  );
};
