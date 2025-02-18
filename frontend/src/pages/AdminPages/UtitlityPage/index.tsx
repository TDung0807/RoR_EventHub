import React, { useState, useEffect } from "react";
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

import { useQuery, useQueries } from "react-query";
import { getHotels } from "../../../service/Hotel";
import { getAllVendor } from "../../../service/Vendor";
import { getRestaurants } from "../../../service/Restaurant";
import { getRoomByHotelId } from "../../../service/Room";
import { addTranspost } from "../../../service/Transport";

// Hàm định dạng giá tiền thành VND
const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN").format(price) + " VND";

export function UtilityPage() {
  const [expand, setExpand] = useState(false);
  const handleExpand = () => setExpand(!expand);

  const changingBtn = ["Fnb", "Hotel", "Vendor"];
  const [activeButton, setActiveButton] = useState(changingBtn[0]);
  const [openSideModal, setOpenSideModal] = useState(false);
  const [actionSideModal, setActionSideModal] = useState("Add");

  const [openOtherSideModal, setOpenOtherSideModal] = useState(false);
  const [actionOtherSideModal, setActionOtherSideModal] = useState("Add");
  const [currentSideData, setCurrentSideData] = useState({});
  const [mainDataId, setMainDataId] = useState(0);

  // Fetch dữ liệu khách sạn, vendor, F&B
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

  if (hotelIsLoading || vendorsIsLoading || FnbIsLoading) {
    return <div>Loading...</div>;
  }

  if (hotelIsError || vendorsIsError || FnbIsError) {
    return <div>Error loading data. Please try again.</div>;
  }

  const hotelsRawsDatas = hotelsRawsData?.data?.hotels || [];

  // Guard against dynamically changing queries
  const roomQueries =
    hotelsRawsDatas.length > 0
      ? useQueries(
          hotelsRawsDatas.map((hotel) => ({
            queryKey: ["roomCurrently", hotel.id],
            queryFn: () => getRoomByHotelId(hotel.id),
            enabled: hotel.id != null,
          }))
        )
      : [];

  // Kiểm tra nếu có bất kỳ API nào đang loading
  const isRoomLoading = roomQueries.some((query) => query.isLoading);
  if (isRoomLoading) return <div>Loading room data...</div>;

  // Kiểm tra nếu có lỗi trong bất kỳ API nào
  const isRoomError = roomQueries.some((query) => query.isError);
  if (isRoomError) return <div>Error loading room data.</div>;

  // Xử lý dữ liệu khách sạn và phòng
  const hotelsData = hotelsRawsDatas.map(
    ({ created_at, updated_at, rating, ...hotel }, index) => {
      // @ts-ignore
      const roomData = roomQueries[index]?.data?.data?.rooms || [];
      const roomTypes = roomData.map((room) => ({
        type: room.name,
        price: formatPrice(room.price),
        remark: room.remark || "",
      }));

      return {
        ...hotel,
        roomTypes,
      };
    }
  );

  const vendorsData = vendorsRawsData.data.vendors.map(
    ({ created_at, updated_at, ...rest }) => {
      return {
        ...rest,
        transportTypes: [],
      };
    }
  );

  const FnbData = FnbRawsData.data.restaurants.map(
    ({ created_at, updated_at, ...rest }) => {
      return { ...rest };
    }
  );

  const location = useLocation();

  const hotelRows = ["Hotel", "Address", "Star", "Distance", "Contact", ""];

  const transportRows = [
    "Transport vendor name",
    "Contact",
    "Distance Limit ",
    "Time Limit ",
    "Service type",
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
          mainDataId={mainDataId}
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

        {activeButton == "Hotel" && (
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
                addingSideDataFunc={(id) => {
                  setOpenOtherSideModal(true);
                  setMainDataId(id);
                  setActionOtherSideModal("Add");
                }}
                sideDataName="roomTypes"
              />
            </Box>
          </Box>
        )}
        {activeButton == "Vendor" && (
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
                Transport Vendor Management
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
              addingSideDataFunc={(id) => {
                setOpenOtherSideModal(true);
                setMainDataId(id);
                setActionOtherSideModal("Add");
              }}
              sideDataName="transportTypes"
            />
          </Box>
        )}
        {activeButton == "Fnb" && (
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
        )}
      </LocalizationProvider>
    </div>
  );
}
