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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
    refetch: refetchDishedFunc,
  } = useQuery(["dished", id], getAllDishedFromRestaurant);

  // Đảm bảo các hook dưới luôn được gọi
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
        // @ts-ignore
        intergrient: query.data?.data?.ingredients || [],
      }));
      if (JSON.stringify(newInterData) !== JSON.stringify(interData)) {
        setInterData(newInterData);
      }
    }
  }, [JSON.stringify(intergrientDataQueries)]);
  const dishedRenderData = dishedData.map((dished, index) => {
    const { description, created_at, updated_at, restaurant_id, ...rest } =
      dished;
    const ingredientData =
      // @ts-ignore
      intergrientDataQueries[index]?.data?.data?.ingredients || [];
    return { ...rest };
  });
  // Các hàm mở modal, chỉnh sửa...
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
  // Bây giờ trong JSX, xử lý loading hoặc error bên trong giao diện
  return (
    <div>
      <ModalDished
        refetchDishedFunc={refetchDishedFunc}
        restaurant_id={id}
        detailDishedData={detailDished}
        action={action}
        setOpen={setModalopen}
        open={modalOpen}
      />

      <Box sx={{ padding: 2 }}>
        <div className={styles.headerContainer}>
          <Link to="/admin/utility" style={{ width: "fit-content" }}>
            <button className={styles.backButton}>
              <ArrowBackIcon />
            </button>
          </Link>
          <MyButton
            label="+ Created Dished"
            className={styles.publishButton}
            sx={{ width: 227, height: 48 }}
            variant="contained"
            onClick={onCreatedModal}
          />
        </div>
        {/* Hiển thị giao diện loading hoặc error nếu cần */}
        {dishedIsLoading ? (
          <Typography>Loading...</Typography>
        ) : dishedIsError ? (
          <Typography>Error: Loading Dished</Typography>
        ) : (
          <MainTable
            editEvent={onEditModal}
            utilityRows={["Dish", "Price", "Type", ""]}
            utilityData={dishedRenderData}
          />
        )}
      </Box>
    </div>
  );
}
