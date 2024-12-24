import { MyDataTable } from "../../../components";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./GuessPage.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

import React, { useState } from "react";

export const AdminGuestPage = () => {
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "group", headerName: "Group", type: "number", width: 120 },
    { field: "groupStatus", headerName: "Group status", width: 120 },
    { field: "dateCreated", headerName: "Date created", width: 130 },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 150,
    },
    {
      field: "lastUpdate",
      headerName: "Last updated",
      width: 600,
    },
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
            <EditIcon
              onClick={() => navigate(`/admin/guests/${params.id}`)}
            ></EditIcon>
          </div>
        );
      },
      sortable: false,
    },
  ];

  const rows = [
    { id: 1, group: 1, groupStatus: "Snow", dateCreated: "Jon", quantity: 35 },
    {
      id: 2,
      group: 2,
      groupStatus: "Lannister",
      dateCreated: "Cersei",
      quantity: 42,
    },
    {
      id: 3,
      group: 3,
      groupStatus: "Lannister",
      dateCreated: "Jaime",
      quantity: 45,
    },
    {
      id: 4,
      group: 4,
      groupStatus: "Stark",
      dateCreated: "Arya",
      quantity: 16,
    },
    {
      id: 5,
      group: 5,
      groupStatus: "Targaryen",
      dateCreated: "Daenerys",
      quantity: null,
    },
    {
      id: 6,
      group: 6,
      groupStatus: "Melisandre",
      dateCreated: null,
      quantity: 150,
    },
    {
      id: 7,
      group: 7,
      groupStatus: "Clifford",
      dateCreated: "Ferrara",
      quantity: 44,
    },
    {
      id: 8,
      group: 8,
      groupStatus: "Frances",
      dateCreated: "Rossini",
      quantity: 36,
    },
    {
      id: 9,
      group: 9,
      groupStatus: "Roxie",
      dateCreated: "Harvey",
      quantity: 65,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <div className={styles.topDivided}>
      <MyDataTable
        columns={columns}
        rows={rows}
        paginationModel={paginationModel}
      ></MyDataTable>
    </div>
  );
};
