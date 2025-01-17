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
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
export function NestedRow({
  row,
  sideData,
  editRef = false,
  editPre = "",
  action,
  editEvent = (item) => {},
}) {
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
          ? Object.keys(row).map((item) =>
              item != sideData && item != "id" ? (
                <TableCell align="center">{row[item]}</TableCell>
              ) : item != "id" && Array.isArray(action) ? (
                <TableCell align="center">
                  {editRef ? (
                    <div style={{ cursor: "pointer" }}>
                      <Link
                        to={`${editPre}/${row[item]}`}
                        style={{ color: "black" }}
                      >
                        <EditIcon></EditIcon>
                      </Link>
                    </div>
                  ) : (
                    <div
                      onClick={() => editEvent(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <EditIcon></EditIcon>
                    </div>
                  )}
                </TableCell>
              ) : (
                ""
              )
            )
          : Object.keys(row).map((key, index) => {
              if (key === sideData) return null;

              const isLastColumn = index + 2 > Object.keys(row).length;
              const isArray = Array.isArray(row[key]);

              return (
                <>
                  {isArray ? (
                    <TableCell align="center" key={key}>
                      {row[key].map((value, chipIndex) => (
                        <Chip
                          key={chipIndex}
                          label={value}
                          style={{ marginLeft: 9 }}
                          color="primary"
                        />
                      ))}
                    </TableCell>
                  ) : isLastColumn && Array.isArray(action) ? (
                    <>
                      <TableCell align="center">{row[key]}</TableCell>
                      <TableCell align="center">
                        {editRef ? (
                          <div style={{ cursor: "pointer" }}>
                            <Link
                              to={`${editPre}/${row["id"]}`}
                              style={{ color: "black" }}
                            >
                              <EditIcon />
                            </Link>
                          </div>
                        ) : (
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => editEvent(row)}
                          >
                            <EditIcon />
                          </div>
                        )}
                      </TableCell>
                    </>
                  ) : (
                    <TableCell align="center">{row[key]}</TableCell>
                  )}
                </>
              );
            })}
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
