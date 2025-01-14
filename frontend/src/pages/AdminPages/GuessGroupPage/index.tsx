import React, { useState } from "react";
import {
  DisplayCardGuestGroup,
  MyButton,
  DisplayGuestListGroup,
  GroupChoosingButton,
  DisplayGuessGroupSideInfo,
  ModalSideGuessinfo,
} from "../../../components";
import styles from "./GuessGroupPage.module.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export function GuessGroupPage() {
  const [serviceSignal, setServiceSignal] = useState(true);
  const [informationSignal, setInformationSignal] = useState(false);

  const changeServiceTabs = () => {
    setServiceSignal(true);
    setInformationSignal(false);
  };
  const changeInformationTabs = () => {
    setInformationSignal(true);
    setServiceSignal(false);
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "No", width: 120 },
    { field: "name", headerName: "Name", width: 500 },
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
              paddingTop: 6,
              marginBottom: "auto",
              cursor: "pointer",
              textAlign: "right",
            }}
          >
            <DeleteIcon
              onClick={() => alert("Bạn muốn xóa User này")}
            ></DeleteIcon>
          </div>
        );
      },
      sortable: false,
    },
  ];
  const rows = [
    { id: 1, name: "Trịnh Trần Phương Tứn", email: "tun@gmail.com" },
    { id: 2, name: "Dũng 5 ngày không tắm", email: "tun@gmail.com" },
    { id: 3, name: "Dũng 7 ngày không đánh răng", email: "tun@gmail.com" },
  ];
  const paginationModel = { page: 0, pageSize: 5 };

  const changingBtn = ["Lunchbox", "Hotel", "Transport"];
  const [activeButton, setActiveButton] = useState(changingBtn[0]);
  const [openSideModal, setOpenSideModal] = useState(false);
  const [actionSideModal, setActionSideModal] = useState("Add");
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ModalSideGuessinfo
          open={openSideModal}
          handleClose={() => {
            setOpenSideModal(false);
          }}
          option={activeButton}
          action={actionSideModal}
        />
        <div className={styles.headerContainer}>
          <button className={styles.backButton}>&lt; Group 1</button>
          <MyButton
            label="Publish"
            className={styles.publishButton}
            sx={{ width: 227, height: 48 }}
            variant="contained"
          ></MyButton>
        </div>
        <div className={styles.tabsContainer}>
          <div className="item_container">
            <button
              className={`${styles.tabButton}`}
              onClick={changeInformationTabs}
            >
              Information
            </button>
            {informationSignal && <div className={styles.blueDivider}></div>}
          </div>
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
                  dateCreated="15 December, 2024"
                  lastUpdated="10:00 on 15 December, 2024"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                />
              </div>
              <div className={styles.cardSection}>
                <DisplayGuestListGroup
                  columns={columns}
                  rows={rows}
                  paginationModel={paginationModel}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.cardSection}>
                <div className={styles.flexingChanging}>
                  <GroupChoosingButton
                    changingBtn={changingBtn}
                    activeButton={activeButton}
                    setActiveButton={setActiveButton}
                  />
                  <MyButton
                    label={`+ Add ${activeButton}`}
                    className={styles.publishButton}
                    sx={{ height: "38.4px" }}
                    variant="contained"
                    onClick={() => {
                      setOpenSideModal(true);
                      setActionSideModal("Add");
                    }}
                  ></MyButton>
                </div>
              </div>

              <div className={styles.cardSection} style={{ paddingTop: 0 }}>
                <DisplayGuessGroupSideInfo
                  options={activeButton}
                  title={`${activeButton} information`}
                  setOpenSideModal={setOpenSideModal}
                  setActionSideModal={setActionSideModal}
                />
              </div>
            </div>
          )}
        </div>{" "}
      </LocalizationProvider>
    </div>
  );
}
