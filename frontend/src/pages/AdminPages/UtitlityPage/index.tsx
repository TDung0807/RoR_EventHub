import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { GroupChoosingButton, MainTable } from "../../../components";
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
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Hotel Management
          </Typography>
          <MainTable
            utilityRows={hotelRows}
            utilityData={fakeHotelsData}
            sideData="roomTypes"
            action={["edit", "delete"]}
          />
        </Box>
      ) : (
        <div></div>
      )}
      {activeButton == "Transport" ? (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Transport Management
          </Typography>
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
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Fnb Management
          </Typography>
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
