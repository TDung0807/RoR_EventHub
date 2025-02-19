import React, { useState, useEffect, useMemo } from "react";
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
import {
  addTranspost,
  getTransportByVendorId,
} from "../../../service/Transport";

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
  const [roomData, setRoomData] = useState([]);
  const [transportData, setTransportData] = useState([]);
  const [transportQueries, setTransportQueries] = useState([]);

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
  const isLoading = hotelIsLoading || vendorsIsLoading || FnbIsLoading;
  const isError = hotelIsError || vendorsIsError || FnbIsError;
  useEffect(() => {
    if (isLoading) console.log("Loading data...");
    if (isError) console.log("Error loading data.");
  }, [isLoading, isError]);

  const hotelsRawsDatas = hotelsRawsData?.data?.hotels || [];
  const vendorsRawsDatas = vendorsRawsData?.data?.vendors || [];
  const fnbRawsDatas = FnbRawsData?.data?.restaurants || [];

  const roomQueries = useMemo(() => {
    return hotelsRawsDatas.map((hotel) => ({
      queryKey: ["roomCurrently", hotel.id],
      queryFn: () => getRoomByHotelId(hotel.id),
      enabled: Boolean(hotel.id),
    }));
  }, [hotelsRawsDatas]);

  const roomDataQueries = useQueries(roomQueries);

  useEffect(() => {
    if (roomDataQueries.length > 0) {
      const newRoomData = roomDataQueries.map((query, index) => ({
        hotelId: roomQueries[index]?.queryKey[1],
        //@ts-ignore
        rooms: query.data?.data?.rooms || [],
      }));

      if (JSON.stringify(newRoomData) != JSON.stringify(transportData)) {
        setRoomData(newRoomData);
      }
    }
  }, [JSON.stringify(roomDataQueries)]);

  useEffect(() => {
    if (vendorsRawsDatas.length > 0) {
      setTransportQueries((prev) => {
        const newTransportDataQueries = vendorsRawsDatas.map((vendor) => ({
          queryKey: ["transportCurrently", vendor.id],
          queryFn: () => getTransportByVendorId(vendor.id),
          enabled: Boolean(vendor.id),
        }));

        return JSON.stringify(prev) == JSON.stringify(newTransportDataQueries)
          ? prev
          : newTransportDataQueries;
      });
    }
  }, [vendorsRawsDatas]);

  const transportDataQueries = useQueries(transportQueries);

  useEffect(() => {
    if (transportDataQueries.length > 0) {
      const newTransportData = transportDataQueries.map((query, index) => ({
        vendorId: transportQueries[index]?.queryKey[1],
        //@ts-ignore
        transports: query.data?.data?.transports || [],
      }));

      if (JSON.stringify(newTransportData) != JSON.stringify(transportData)) {
        setTransportData(newTransportData);
      }
    }
  }, [JSON.stringify(transportDataQueries)]);

  // Kiểm tra trạng thái loading và error từ roomDataQueries
  const isRoomLoading = roomDataQueries.some((query) => query.isLoading);
  const isRoomError = roomDataQueries.some((query) => query.isError);
  const isTransportLoading = transportDataQueries.some(
    (query) => query.isLoading
  );
  const isTransportError = transportDataQueries.some((query) => query.isError);
  if (isRoomLoading) return <div>Loading Room & Transport data...</div>;
  if (isRoomError) return <div>Error loading Room & Transport data.</div>;

  // Xử lý dữ liệu khách sạn và phòng
  const hotelsData = hotelsRawsDatas.map(
    ({ created_at, updated_at, rating, ...hotel }, index) => {
      // @ts-ignore
      const roomData = roomDataQueries[index]?.data?.data?.rooms || [];
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

  const vendorsData = vendorsRawsDatas.map(
    ({ created_at, updated_at, ...rest }, index) => {
      // @ts-ignore
      const transportData =
        // @ts-ignore
        transportDataQueries[index]?.data?.data?.transports || [];
      const transportType = transportData.map((transportData) => ({
        type: transportData.transport_type,
        brand: transportData.brand,
        price: formatPrice(transportData.price),
        remark: transportData.remark || "",
      }));
      return {
        ...rest,
        transportTypes: transportType.length >= 0 ? transportType : [],
      };
    }
  );
  const FnbData = fnbRawsDatas.map(({ created_at, updated_at, ...rest }) => {
    return { ...rest };
  });

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
