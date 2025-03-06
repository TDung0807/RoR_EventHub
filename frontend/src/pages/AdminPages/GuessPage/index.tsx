import {
  MainTable,
  GuessGroupModal,
  ModalGuestList,
  DeleteModal,
} from "../../../components";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./GuessPage.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { fakeGuessGroupData } from "../../../mockdata";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllGroup, deleteGroupById } from "../../../service/GuessGroup";
import { getAllEvent } from "../../../service/Event";

import { toast } from "react-toastify";
export const AdminGuestPage = () => {
  const queryClient = useQueryClient();

  const {
    data: EventDataRaws,
    isLoading: eventIsLoading,
    isError: eventIsError,
  } = useQuery(["eventGroup"], getAllEvent);
  const { data, error, isError, isLoading, refetch } = useQuery(
    ["guessgroups"],
    getAllGroup
  );
  const { mutateAsync: deleteGroupByIdFunc } = useMutation({
    mutationFn: deleteGroupById,
  });
  const { hash, pathname, search } = location;
  const [openGuessGroupModal, setOpenGuessGroupModal] = useState(false);
  const [openGuessListModal, setOpenGuessListModal] = useState(false);
  const [guessListId, setGuessListId] = useState({});
  const [deleteFunc, setDeleteFunc] = useState(() => {});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  if (isLoading || eventIsLoading) {
    return <div>Loading...</div>;
  }
  let groupData = !data ? [] : data.data.groups;
  let eventData = !EventDataRaws ? [] : EventDataRaws.data;

  const guessGroupRows = [
    "Group",
    "Event Name",
    "Group Status ",
    "Quantity",
    "Date Created ",
    "Last Update",
    "",
  ];
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().replace("T", " ").substring(0, 19);
  };
  const transformedData = groupData.map(
    ({
      id,
      group,
      groupStatus,
      quantity,
      created_at,
      updated_at,
      event_id,
    }) => {
      const eventDataName =
        eventData.find((event) => event.id == event_id)?.label || "";
      return {
        id,
        group,
        eventDataName,
        groupStatus,
        quantity,
        created_at: formatDate(created_at),
        updated_at: formatDate(updated_at),
      };
    }
  );
  const handleDeleteMainData = async (row) => {
    let result = confirm("Are you sure delete this");
    if (result == false) {
      return;
    }
    try {
      await deleteGroupByIdFunc(row.id);
      toast("Delete Successfully");
      await queryClient.refetchQueries({ queryKey: ["guessgroups"] });
    } catch {
      toast("Delete Failure", { type: "error" });
    }
  };
  return (
    <div>
      <DeleteModal
        open={openDeleteModal}
        handleClose={() => {
          setOpenDeleteModal(false);
        }}
        handleDelete={deleteFunc}
      ></DeleteModal>
      {openGuessGroupModal == true ? (
        <GuessGroupModal
          refetchFunc={refetch}
          open={openGuessGroupModal}
          handleClose={() => {
            setOpenGuessGroupModal(false);
          }}
          basedData={[]}
          handleChangingGuessList={(guessListId) => {
            setGuessListId(guessListId);
            setOpenGuessGroupModal(false);
            setOpenGuessListModal(true);
          }}
          action={"Add"}
        />
      ) : (
        ""
      )}
      {openGuessListModal == true ? (
        <ModalGuestList
          idGuessGroup={guessListId}
          open={openGuessListModal}
          handleClose={() => {
            setOpenGuessListModal(false);
          }}
          isCreated={true}
        />
      ) : (
        ""
      )}
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
              borderBottom: "1px solid #ddd",
            }}
          >
            <Typography
              fontWeight={700}
              fontFamily={"Montserrat"}
              color="#005FB3"
              variant="h4"
              marginBottom={0}
            >
              Guest Group List
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenGuessGroupModal(true);
                }}
              >
                + Create Guest Group
              </Button>
            </Box>
          </Box>
          <MainTable
            handleDeleteMainData={(row) => {
              setDeleteFunc(() => () => handleDeleteMainData(row));
              setOpenDeleteModal(true);
            }}
            editPre={`${pathname}`}
            editRef={true}
            utilityRows={guessGroupRows}
            utilityData={transformedData}
            action={["edit", "delete"]}
          />
        </Box>
      </Box>
    </div>
  );
};
