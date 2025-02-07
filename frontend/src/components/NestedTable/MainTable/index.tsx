// Import necessary libraries
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { NestedRow } from "../NestedRow";
// Main Table Component
export function MainTable({
  utilityRows,
  utilityData,
  sideData = null,
  editRef = false,
  editPre = "",
  action = [],
  addingSideData = false,
  addingSideDataFunc = () => {},
  editEvent = (item) => {},
  sideDataName = "",
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {!sideData ? (
              <TableCell align="center"> No </TableCell>
            ) : (
              <TableCell align="center"> </TableCell>
            )}

            {utilityRows.map((item, key) => (
              <TableCell align="center" key={key}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {utilityData.map((utility) => (
            <NestedRow
              editRef={editRef}
              editPre={editPre}
              sideData={sideData}
              key={utility.id}
              row={utility}
              action={action}
              editEvent={editEvent}
              addingSideDataFunc={addingSideDataFunc}
              addingSideData={addingSideData}
              sideDataName={sideDataName}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
