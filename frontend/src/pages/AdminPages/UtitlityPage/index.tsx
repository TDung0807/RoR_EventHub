import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { Box, Typography, Button } from "@mui/material";
import { GroupChoosingButton, MainTable, MyButton } from "../../../components";
import styles from "./UtilityPage.module.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  fakeHotelsData,
  fakeTransportData,
  fakeRestaurantData,
} from "../../../mockdata";
export function UtilityPage() {
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand(!expand);
  };
  const location = useLocation();

  const changingBtn = ["Fnb", "Hotel", "Transport"];

  const hotelRows = ["Hotel", "Address", "Star", "Distance", "Contact", ""];
  const transportRows = [
    "Transport vendor name",
    "Service type",
    "Distance Limit ",
    "Time Limit ",
    "Contact",
    "",
  ];
  const FnbRows = [
    "Restaurant",
    "Address",
    "Cuisine type ",
    "No. dishes ",
    "Main ingredient",
    "Contact",
    "",
  ];
  const [activeButton, setActiveButton] = useState(changingBtn[0]);
  return (
    <div>
      <div
        className={styles.flexingChanging}
        style={{ marginLeft: "0", marginTop: 37 }}
      >
        <GroupChoosingButton
          changingBtn={changingBtn}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
      </div>

      {activeButton == "Hotel" ? (
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Typography
                fontWeight={700}
                fontFamily={"Montserrat"}
                color="#005FB3"
                variant="h4"
                marginBottom={0}
              >
                Hotel Management
              </Typography>
              <MyButton
                style={{ marginRight: 20 }}
                label=" + Create Hotel"
                variant="contained"
              ></MyButton>
            </Box>
            <MainTable
              utilityRows={hotelRows}
              utilityData={fakeHotelsData}
              sideData="roomTypes"
              action={["edit", "delete"]}
            />
          </Box>
        </Box>
      ) : (
        <div></div>
      )}
      {activeButton == "Transport" ? (
        <Box sx={{ padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Typography
              fontWeight={700}
              fontFamily={"Montserrat"}
              color="#005FB3"
              variant="h4"
              marginBottom={0}
            >
              Transport Vendor Managment
            </Typography>
            <MyButton
              style={{ marginRight: 20 }}
              label=" + Create Transport"
              variant="contained"
            ></MyButton>
          </Box>
          <MainTable
            utilityRows={transportRows}
            utilityData={fakeTransportData}
            sideData="transportTypes"
            action={["edit", "delete"]}
          />
        </Box>
      ) : (
        <div></div>
      )}
      {activeButton == "Fnb" ? (
        <Box sx={{ padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Typography
              fontWeight={700}
              fontFamily={"Montserrat"}
              color="#005FB3"
              variant="h4"
              marginBottom={0}
            >
              FNB Management
            </Typography>
            <MyButton
              style={{ marginRight: 20 }}
              label=" + Create Restaurant"
              variant="contained"
            ></MyButton>
          </Box>
          <MainTable
            editPre={`${location.pathname}/dished`}
            editRef={true}
            utilityRows={FnbRows}
            utilityData={fakeRestaurantData}
            action={["edit", "delete"]}
          />
        </Box>
      ) : (
        <div></div>
      )}
    </div>
  );
}
