import React, { useState } from "react";
import {
  DisplayCardGuestGroup,
  MyButton,
  DisplayGuestListGroup,
  GroupChoosingButton,
  DisplayGuessGroupSideInfo,
  ModalSideGuessinfo,
} from "../../../components";
import styles from "./UserGuessGroupPage.module.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllGuessFromGroup,
  changedGuestStatus,
} from "../../../service/Guess";
import { getGroupById, deleteGroupById } from "../../../service/GuessGroup";
import { useQuery, useQueryClient } from "react-query";
import { useMutation } from "@tanstack/react-query";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import { useAccountAuthetication } from "../../../store";
import { Chip } from "@mui/material";
const filterByEmail = (data, email) => {
  return data.filter((item) => item.email === email);
};
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toISOString().replace("T", " ").substring(0, 19);
};
export const UserGuessGroupPage = () => {
  const email = useAccountAuthetication((state) => state.email);
  const [serviceSignal, setServiceSignal] = useState(true);
  const [informationSignal, setInformationSignal] = useState(false);
  const [editData, setEditData] = useState({});
  const changingBtn = ["Restaurant", "Hotel", "Transport"];
  const [activeButton, setActiveButton] = useState(changingBtn[0]);
  const [openSideModal, setOpenSideModal] = useState(false);
  const [actionSideModal, setActionSideModal] = useState("Add");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: guessGroupData,
    error: guessGroupDataError,
    isError: guessGroupDataIsError,
    isLoading: guessGroupDataIsLoading,
    refetch: refetchGuessGroup,
  } = useQuery(["guessGroupData", id], getGroupById);

  const {
    data: guestInGroup,
    isError: guestInGroupIsError,
    isLoading: guestInGroupIsLoading,
    refetch: refetchGuestInGroup,
  } = useQuery(["guestIngroup", id], getAllGuessFromGroup);
  const { mutateAsync } = useMutation({ mutationFn: changedGuestStatus });
  // Handle loading and error states
  if (guestInGroupIsLoading || guessGroupDataIsLoading) {
    return <div>Loading...</div>;
  }

  if (guestInGroupIsError || guessGroupDataIsError) {
    return <div>Error loading data. Please try again.</div>;
  }
  const guessGroupDataRender = guessGroupData?.data?.group || [];
  const usersArr = guestInGroup?.data?.quests || [];

  const result = filterByEmail(usersArr, email);
  const changeServiceTabs = () => {
    setServiceSignal(true);
    setInformationSignal(false);
  };
  const changeInformationTabs = () => {
    setInformationSignal(true);
    setServiceSignal(false);
  };
  const acceptAttending = async () => {
    try {
      const result = await mutateAsync({
        email,
        group_id: id,
        status: "accepted",
      });
      toast("Confirm Succesfully", { type: "success" });
      queryClient.refetchQueries();
    } catch {
      toast("Confirm Failure", { type: "error" });
    }
  };
  const declinedAttending = async () => {
    try {
      const result = await mutateAsync({
        email,
        group_id: id,
        status: "declined",
      });
      toast("Decline Succesfully", { type: "success" });
      queryClient.refetchQueries();
    } catch {
      toast("Decline Failure", { type: "error" });
    }
  };

  const openEditTabs = (rows) => {
    setOpenSideModal(true);
    if (activeButton == "Restaurant") {
      setEditData({
        ...guessGroupDataRender.restaurant,
        remark: guessGroupDataRender.dish_remark,
      });
    }
    if (activeButton == "Hotel") {
      setEditData({
        ...guessGroupDataRender.hotel,
        remark: guessGroupDataRender.hotel_remark,
      });
    }
    if (activeButton == "Transport") {
      setEditData({
        ...guessGroupDataRender.transport,
        remark: guessGroupDataRender.transport_remark,
      });
    }
    setActionSideModal("Edit");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "No", width: 120 },
    { field: "name", headerName: "Name", width: 120 },
    { field: "email", headerName: "Email", width: 500 },

    {
      headerName: "",
      field: "actionFields",
      width: 80,
      renderCell: (params) => {
        return (
          <div
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              cursor: "pointer",
              textAlign: "right",
            }}
          >
            <DeleteIcon onClick={async () => {}}></DeleteIcon>
          </div>
        );
      },
      sortable: false,
    },
  ];
  const statusColor = {
    accepted: "success",
    pending: "warning",
    declined: "error",
  };
  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ModalSideGuessinfo
          data={editData}
          open={openSideModal}
          handleClose={() => {
            setOpenSideModal(false);
          }}
          refetchGuessGroup={refetchGuessGroup}
          option={activeButton}
          action={actionSideModal}
        />
        <div className={styles.headerContainer}>
          <div>
            <button
              onClick={() => {
                navigate("/user/guests");
              }}
              className={styles.backButton}
            >
              <ArrowBackIcon />
            </button>
            {result.length > 0 &&
              result[0].status &&
              statusColor[result[0].status] && (
                <Chip
                  style={{ marginLeft: 8, width: "fit-content" }}
                  label={result[0].status}
                  color={statusColor[result[0].status]}
                />
              )}
          </div>

          <div>
            {result.length > 0 &&
              result[0].status &&
              result[0].status != "accepted" && (
                <MyButton
                  label={` Attending`}
                  className={styles.publishButton}
                  sx={{ height: "38px" }}
                  variant="contained"
                  onClick={acceptAttending}
                ></MyButton>
              )}
            {result.length > 0 &&
              result[0].status &&
              result[0].status != "declined" && (
                <MyButton
                  label={`Decline `}
                  className={styles.publishButton}
                  sx={{ height: "38px" }}
                  variant="contained"
                  onClick={declinedAttending}
                  style={{ backgroundColor: "#e53935" }}
                ></MyButton>
              )}
          </div>
        </div>
        <div className={styles.tabsContainer}>
          <div className="item_container">
            <button
              className={`${styles.tabButton}`}
              onClick={changeServiceTabs}
            >
              Service
            </button>
            {serviceSignal && <div className={styles.blueDivider}></div>}
          </div>
        </div>
        <div className={styles.grayLayout}>
          {informationSignal == true ? (
            <div>
              <div className={styles.cardSection}>
                <DisplayCardGuestGroup
                  dateCreated={formatDate(guessGroupDataRender.created_at)}
                  lastUpdated={formatDate(guessGroupDataRender.updated_at)}
                  description={guessGroupDataRender.description}
                />
              </div>
              <div className={styles.cardSection}>
                <DisplayGuestListGroup
                  idGuessGroup={id}
                  columns={columns}
                  rows={usersArr}
                  paginationModel={paginationModel}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.cardSection}>
                <div className={styles.flexingChanging}>
                  <GroupChoosingButton
                    style={{
                      marginLeft: 80,
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 20,
                      border: "1px solid #ccc",
                      borderRadius: 10,
                      overflow: "hidden",
                      width: "fit-content",
                    }}
                    changingBtn={changingBtn}
                    activeButton={activeButton}
                    setActiveButton={setActiveButton}
                  />
                  {/* <MyButton
                    label={`+ Add ${activeButton}`}
                    className={styles.publishButton}
                    sx={{ height: "38.4px" }}
                    variant="contained"
                    onClick={() => {
                      setOpenSideModal(true);
                      setActionSideModal("Add");
                    }}
                  ></MyButton> */}
                </div>
              </div>

              <div className={styles.cardSection} style={{ paddingTop: 0 }}>
                <DisplayGuessGroupSideInfo
                  editSignal={false}
                  guessGroupData={guessGroupDataRender}
                  options={activeButton}
                  title={`${activeButton} information`}
                  editFunc={openEditTabs}
                />
              </div>
            </div>
          )}
        </div>{" "}
      </LocalizationProvider>
    </div>
  );
};
