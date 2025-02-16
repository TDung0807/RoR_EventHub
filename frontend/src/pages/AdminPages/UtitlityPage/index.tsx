import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { Box, Typography, Button, Rating } from "@mui/material";
import {
  GroupChoosingButton,
  MainTable,
  MyButton,
  ModalSideGuessinfo,
  OtherSideModal,
} from "../../../components";
import styles from "./UtilityPage.module.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useQuery } from "react-query";
import { getHotels } from "../../../service/Hotel";
import { getAllVendor } from "../../../service/Vendor";
import { getRestaurants } from "../../../service/Restaurant";

export function UtilityPage() {
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand(!expand);
  };
  const {
    data: hotelsRawsData,
    error: hotelError,
    isError: hotelIsError,
    isLoading: hotelIsLoading,
  } = useQuery(["hotels"], getHotels);

  const {
    data: vendorsRawsData,
    error: vendorsError,
    isError: vendorsIsError,
    isLoading: vendorsIsLoading,
  } = useQuery(["vendors"], getAllVendor);
  const {
    data: FnbRawsData,
    error: FnbError,
    isError: FnbIsError,
    isLoading: FnbIsLoading,
  } = useQuery(["Fnb"], getRestaurants);
  const changingBtn = ["Fnb", "Hotel", "Vendor"];

  const [activeButton, setActiveButton] = useState(changingBtn[0]);
  const [openSideModal, setOpenSideModal] = useState(false);
  const [actionSideModal, setActionSideModal] = useState("Add");

  const [openOtherSideModal, setOpenOtherSideModal] = useState(false);
  const [actionOtherSideModal, setActionOtherSideModal] = useState("Add");
  const [currentSideData, setCurrentSideData] = useState({});
  if (hotelIsLoading || vendorsIsLoading || FnbIsLoading) {
    return <div>Loading...</div>;
  }
  const hotelsRawsDatas = hotelsRawsData.data.hotels;

  const hotelsData = hotelsRawsDatas.map(
    ({
      checkin_time,
      checkout_time,
      created_at,
      updated_at,
      rating,
      ...rest
    }) => rest
  );

  const vendorsData = vendorsRawsData.data.vendors;
  const FnbData = FnbRawsData.data.restaurants;
  const location = useLocation();

  const hotelRows = ["Hotel", "Address", "Star", "Distance", "Contact", ""];
  const transportRows = [
    "Transport vendor name",
    "Contact",
    "Distance Limit ",
    "Time Limit ",
    "Service type",
    "Created At",
    "Update At",
    "",
  ];
  const FnbRows = [
    "Restaurant",
    "Address",
    "Contact",
    "Cuisine type ",
    "No. dishes ",
    "Main ingredient",
    "",
  ];

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ModalSideGuessinfo
          data={currentSideData}
          open={openSideModal}
          handleClose={() => {
            setOpenSideModal(false);
          }}
          option={activeButton}
          action={actionSideModal}
        />
        <OtherSideModal
          open={openOtherSideModal}
          handleClose={() => {
            setOpenOtherSideModal(false);
          }}
          option={activeButton}
          action={actionOtherSideModal}
        />
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
                  onClick={() => {
                    setOpenSideModal(true);
                    setActionSideModal("Add");
                  }}
                ></MyButton>
              </Box>
              <MainTable
                utilityRows={hotelRows}
                utilityData={hotelsData}
                sideData="roomTypes"
                action={["edit", "delete"]}
                editEvent={(item) => {
                  setCurrentSideData(item);
                  setOpenSideModal(true);
                  setActionSideModal("Edit");
                }}
                addingSideData={true}
                addingSideDataFunc={() => {
                  setOpenOtherSideModal(true);
                  setActionOtherSideModal("Add");
                }}
                sideDataName="Hotel Type"
              />
            </Box>
          </Box>
        ) : (
          <div></div>
        )}
        {activeButton == "Vendor" ? (
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
                label=" + Create Vendor"
                variant="contained"
                onClick={() => {
                  setOpenSideModal(true);
                  setActionSideModal("Add");
                }}
              ></MyButton>
            </Box>
            <MainTable
              editEvent={(item) => {
                setCurrentSideData(item);
                setOpenSideModal(true);
                setActionSideModal("Edit");
              }}
              utilityRows={transportRows}
              utilityData={vendorsData}
              sideData="transportTypes"
              action={["edit", "delete"]}
              addingSideData={true}
              addingSideDataFunc={() => {
                setOpenOtherSideModal(true);
                setActionOtherSideModal("Add");
              }}
              sideDataName="Transport Type"
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
                FnB Management
              </Typography>
              <MyButton
                style={{ marginRight: 20 }}
                label=" + Create Restaurant"
                variant="contained"
                onClick={() => {
                  setOpenSideModal(true);
                  setActionSideModal("Add");
                }}
              ></MyButton>
            </Box>
            <MainTable
              editPre={`${location.pathname}/dished`}
              editRef={true}
              utilityRows={FnbRows}
              utilityData={FnbData}
              action={["edit", "delete"]}
            />
          </Box>
        ) : (
          <div></div>
        )}
      </LocalizationProvider>
    </div>
  );
}
