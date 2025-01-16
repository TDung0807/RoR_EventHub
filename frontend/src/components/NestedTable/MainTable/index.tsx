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
export function MainTable({ utilityRows, utilityData, sideData = null }) {
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
            <NestedRow sideData={sideData} key={utility.id} row={utility} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
