import {
  MainTable,
  GuessGroupModal,
  ModalGuestList,
} from "../../../components";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./GuessPage.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { fakeGuessGroupData } from "../../../mockdata";
import React, { useState } from "react";
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import { getGuestByEmail } from "../../../service/Guess";
import { useAccountAuthetication } from "../../../store";

import {
  getAllGroup,
  deleteGroupById,
  getGroupByIdGuest,
  getGroupById,
} from "../../../service/GuessGroup";
import { getAllEvent } from "../../../service/Event";

import { toast } from "react-toastify";
export const UserGuessPage = () => {
  const { mutateAsync: deleteGroupByIdFunc } = useMutation({
    mutationFn: deleteGroupById,
  });

  const { hash, pathname, search } = location;
  const [openGuessGroupModal, setOpenGuessGroupModal] = useState(false);
  const [openGuessListModal, setOpenGuessListModal] = useState(false);
  const [guessListId, setGuessListId] = useState({});
  const queryClient = useQueryClient();
  const email = useAccountAuthetication((state) => state.email);
  const {
    data: EventDataRaws,
    isLoading: eventIsLoading,
    isError: eventIsError,
  } = useQuery(["eventGroup"], getAllEvent);
  const {
    data: guestResult2,
    isError: guest2IsError,
    isLoading: guest2IsLoading,
  } = useQuery(
    ["guessTakingEmail", email],
    () =>
      //@ts-ignore
      getGuestByEmail(email),
    {
      enabled: !!email, // Automatically runs only when guestEmail is truthy (Optional)
    }
  );
  const groupIds = guestResult2?.data?.quest?.group_ids || [];

  const groupQueries = useQueries(
    groupIds.map((groupId) => ({
      queryKey: ["allEvents", groupId],
      queryFn: ({ queryKey }) => getGroupById({ queryKey }),
      enabled: !!groupId, // Runs only if groupId is truthy
    }))
  );

  // Combine all guests from each group
  const isGroupsLoading = groupQueries.some((query) => query.isLoading);
  const isGroupsError = groupQueries.some((query) => query.isError);
  // Combine all guests from each group
  const groupData = groupQueries
    //@ts-ignore
    .filter((query) => query.data?.data?.group) // Only include successful queries with data
    //@ts-ignore
    .flatMap((query) => query.data.data.group);

  if (guest2IsLoading || isGroupsLoading || eventIsLoading)
    return <p>Loading...</p>;
  if (guest2IsError || isGroupsError || eventIsError)
    return <p>Error fetching data</p>;
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
      console.log(event_id);
      const eventDataName = eventData.find(
        (event) => event.id == event_id
      ).label;
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
  const handleDeleteMainData = (row) => {
    let result = confirm("Are you sure delete this");
    if (result == false) {
      return;
    }
    try {
      deleteGroupByIdFunc(row.id);
      toast("Delete Successfully");
      queryClient.refetchQueries({ queryKey: ["guessgroups"] });
    } catch {
      toast("Delete Failure", { type: "error" });
    }
  };
  return (
    <div>
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
            <Box sx={{ display: "flex", alignItems: "center" }}></Box>
          </Box>
          <MainTable
            handleDeleteMainData={handleDeleteMainData}
            editPre={`${pathname}`}
            editRef={true}
            utilityRows={guessGroupRows}
            utilityData={transformedData}
            action={["edit"]}
            deleteSignal={false}
          />
        </Box>
      </Box>
    </div>
  );
};
