import React, { useState } from "react";
import styles from "./Dishedpage.module.scss";

import { Box, Typography } from "@mui/material";
import { ModalDished, MainTable, MyButton } from "../../../components";
import { fakeDishedData } from "../../../mockdata";
import { Link } from "react-router-dom";
export function DishedPage() {
  const [modalOpen, setModalopen] = useState(false);
  const [detailDished, setDetailDished] = useState(null);
  const [action, setAction] = useState("");

  const handleOpen = () => setModalopen(true);
  const onEditModal = (item) => {
    handleOpen();
    setDetailDished(item);
    setAction("edit");
  };
  const onCreatedModal = () => {
    handleOpen();
    setDetailDished(null);
    setAction("add");
  };
  const FnbRows = ["Dish", "Type ", "Main Ingredient ", "Price", ""];
  return (
    <div>
      <ModalDished
        detailDishedData={detailDished}
        action={action}
        setOpen={setModalopen}
        open={modalOpen}
      ></ModalDished>
      <Box sx={{ padding: 2 }}>
        <div className={styles.headerContainer}>
          <Link to="/admin/utility" style={{ width: "fit-content" }}>
            <button className={styles.backButton}>&lt; Group 1</button>
          </Link>

          <MyButton
            label="+ Created Dished"
            className={styles.publishButton}
            sx={{ width: 227, height: 48 }}
            variant="contained"
            onClick={onCreatedModal}
          ></MyButton>
        </div>
        <MainTable
          editEvent={onEditModal}
          utilityRows={FnbRows}
          utilityData={fakeDishedData}
        />
      </Box>
    </div>
  );
}
