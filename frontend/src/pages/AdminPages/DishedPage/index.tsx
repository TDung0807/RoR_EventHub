import React, { useState, useEffect, useMemo } from "react";
import styles from "./Dishedpage.module.scss";

import { Box, Typography } from "@mui/material";
import { ModalDished, MainTable, MyButton } from "../../../components";
import { fakeDishedData } from "../../../mockdata";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery, useQueries, useMutation, useQueryClient } from "react-query";
import {
  getAllDishedFromRestaurant,
  deleteDishedById,
} from "../../../service/Dish";
import { getAllIntergrientByDishedId } from "../../../service/Ingredient";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getRestaurantById } from "../../../service/Restaurant";
import { ModalSideGuessinfo } from "../.././../components";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

export function DishedPage() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [modalOpen, setModalopen] = useState(false);
  const [modalRestaurant, setModalRestaurant] = useState(false);

  const [detailDished, setDetailDished] = useState(null);
  const [action, setAction] = useState("");
  const [interData, setInterData] = useState([]);
  const { mutateAsync: deleteDishedByIdFunc } = useMutation({
    mutationFn: deleteDishedById,
  });
  const {
    data: dishedRawsData,
    error: dishedError,
    isError: dishedIsError,
    isLoading: dishedIsLoading,
    refetch: refetchDishedFunc,
  } = useQuery(["dished", id], getAllDishedFromRestaurant);
  const {
    data: restaurantRawsData,
    error: restaurantError,
    isError: restaurantIsError,
    isLoading: restaurantIsLoading,
    refetch: refetchRestaurant,
  } = useQuery(["restaurants", id], getRestaurantById);
  // Đảm bảo các hook dưới luôn được gọi
  const dishedData = dishedRawsData?.data?.dishes || [];
  const restaurantData = restaurantRawsData?.data || [];

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
  const handleDeleteMainData = async (row) => {
    let result = confirm("Are you sure delete this");
    if (result == false) {
      return;
    }
    try {
      await deleteDishedByIdFunc(row.id);
      await queryClient.refetchQueries({ queryKey: ["dished"] });
      toast("Delete Succesfully", { type: "success" });
    } catch {
      toast("Delete Failure", { type: "error" });
    }
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
      <ModalSideGuessinfo
        open={modalRestaurant}
        handleClose={() => {
          setModalRestaurant(false);
        }}
        action="Edit"
        data={restaurantData}
        option="Restaurant"
      ></ModalSideGuessinfo>
      <Box sx={{ padding: 2 }}>
        <div className={styles.headerContainer}>
          <div style={{ width: "fit-content" }}>
            <Link to="/admin/utility">
              <button className={styles.backButton}>
                <ArrowBackIcon />
              </button>
            </Link>
            <button
              className={styles.backButton}
              onClick={() => {
                setModalRestaurant(true);
              }}
            >
              <EditIcon />
            </button>
          </div>

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
            handleDeleteMainData={handleDeleteMainData}
            editEvent={onEditModal}
            utilityRows={["Dish", "Price", "Type", ""]}
            utilityData={dishedRenderData}
          />
        )}
      </Box>
    </div>
  );
}
