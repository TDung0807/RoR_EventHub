import React, { useState, useEffect, useMemo } from "react";
import styles from "./Dishedpage.module.scss";

import { Box, Typography } from "@mui/material";
import { ModalDished, MainTable, MyButton } from "../../../components";
import { fakeDishedData } from "../../../mockdata";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery, useQueries } from "react-query";
import { getAllDishedFromRestaurant } from "../../../service/Dish";
import { getAllIntergrientByDishedId } from "../../../service/Ingredient";

export function DishedPage() {
  const { id } = useParams();
  const [modalOpen, setModalopen] = useState(false);
  const [detailDished, setDetailDished] = useState(null);
  const [action, setAction] = useState("");
  const [interData, setInterData] = useState([]);
  const {
    data: dishedRawsData,
    error: dishedError,
    isError: dishedIsError,
    isLoading: dishedIsLoading,
  } = useQuery(["dished", id], getAllDishedFromRestaurant);
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
  if (dishedIsLoading) {
    return <div>Loading...</div>;
  }

  const dishedRows = ["Dish", "Price", "Type ", "Main Ingredient ", ""];
  const dishedData = dishedRawsData?.data?.dishes || [];

  const intergrientQuery = useMemo(() => {
    return dishedData.map((dished) => ({
      queryKey: ["roomCurrently", dished.id],
      queryFn: () => getAllIntergrientByDishedId(dished.id),
      enabled: Boolean(dished.id),
    }));
  }, [dishedData]);

  const intergrientDataQueries = useQueries(intergrientQuery);

  useEffect(() => {
    if (intergrientDataQueries.length > 0) {
      const newInterData = intergrientDataQueries.map((query, index) => ({
        intergrient_id: intergrientQuery[index]?.queryKey[1],
        //@ts-ignore
        intergrient: query.data?.data?.ingredients || [],
      }));

      if (JSON.stringify(newInterData) != JSON.stringify(interData)) {
        setInterData(newInterData);
      }
    }
  }, [JSON.stringify(intergrientDataQueries)]);

  let dishedRenderData = [];
  if (dishedData.length != 0) {
    dishedRenderData = dishedData.map(
      ({ description, created_at, updated_at, id, ...rest }, index) => {
        const interData =
          // @ts-ignore
          intergrientDataQueries[index]?.data?.data?.ingredients || [];
        return { ...rest, MainInter: interData };
      }
    );
  }

  return (
    <div>
      <ModalDished
        restaurant_id={id}
        detailDishedData={detailDished}
        action={action}
        setOpen={setModalopen}
        open={modalOpen}
      ></ModalDished>
      <Box sx={{ padding: 2 }}>
        <div className={styles.headerContainer}>
          <Link to="/admin/utility" style={{ width: "fit-content" }}>
            <button className={styles.backButton}>&lt;</button>
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
          utilityRows={dishedRows}
          utilityData={dishedRenderData}
        />
      </Box>
    </div>
  );
}
