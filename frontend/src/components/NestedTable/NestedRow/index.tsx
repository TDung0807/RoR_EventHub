// Import necessary libraries
import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Chip,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
export function NestedRow({ row, sideData }) {
  const [open, setOpen] = useState(false);
  const itemSide = sideData == null ? 0 : row[sideData];
  const sizeOfItemSide = sideData == null ? 0 : Object.keys(itemSide[0]).length;
  return (
    <>
      <TableRow>
        {sideData != null ? (
          <TableCell align="center">
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? (
                <RemoveCircleIcon color="primary" />
              ) : (
                <AddCircleIcon color="primary" />
              )}
            </IconButton>
          </TableCell>
        ) : (
          ""
        )}

        {sideData != null
          ? Object.keys(row).map(
              (item) =>
                item != sideData &&
                item != "id" && (
                  <TableCell align="center">{row[item]}</TableCell>
                )
            )
          : Object.keys(row).map(
              (item) =>
                item != sideData && (
                  <TableCell align="center">
                    {Array.isArray(row[item]) == true
                      ? row[item].map((item) => (
                          <Chip
                            label={`${item}`}
                            style={{ marginLeft: 9 }}
                            color="primary"
                          />
                        ))
                      : row[item]}
                  </TableCell>
                )
            )}
      </TableRow>
      {sideData != null ? (
        <TableRow sx={{ marginLeft: 80 }}>
          <TableCell colSpan={6} style={{ padding: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box
                sx={{ margin: 0 }}
                style={{
                  padding: 21,
                  backgroundColor: "#F1F9FF",
                  borderRadius: "12px",
                }}
              >
                <div style={{ backgroundColor: "#fff" }}>
                  <Table size="small" aria-label="room types">
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        {[itemSide[0]].map((itemObj) =>
                          Object.keys(itemObj).map((item) => (
                            <TableCell>{item}</TableCell>
                          ))
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row[sideData].map((room, index) => (
                        <TableRow key={index}>
                          <TableCell width={60}>{index + 1}</TableCell>
                          {Object.keys(room).map((key) =>
                            `${sizeOfItemSide}` == key ? (
                              <TableCell width={140}>{room[key]}</TableCell>
                            ) : (
                              <TableCell width={280}>{room[key]}</TableCell>
                            )
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : (
        ""
      )}
    </>
  );
}
