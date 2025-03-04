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
  addingSideData = false,
  addingSideDataFunc = (id) => {},
  editSideDataFunc = (id, room) => {},

  sideDataName = "",
}) {
  const [open, setOpen] = useState(false);
  const itemSide = sideData == null ? null : row[sideData];
  let sizeOfItemSide = 0;
  const hotelsRows = ["No", "Room type", "Price per night", "Remark", ""];
  const transportRows = [
    "No",
    "Transport type",
    "Brand",
    "Price ",
    "Remark",
    "",
  ];
  try {
    sizeOfItemSide =
      !sideData || sideData == undefined ? 0 : Object.keys(itemSide[0]).length;
  } catch {
    sideData = [];
    sizeOfItemSide = 0;
  }
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
              item != sideDataName &&
              item != "id" &&
              item != "checkout_time" &&
              item != "checkin_time" ? (
                <TableCell align="center">{row[item]}</TableCell>
              ) : item != "id" &&
                Array.isArray(action) &&
                item != "checkout_time" &&
                item != "checkin_time" ? (
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
                      onClick={() => {
                        console.log(row);
                        editEvent(row);
                      }}
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
      <TableRow>
        {sideData != null ? (
          <TableCell colSpan={7} style={{ padding: 0 }}>
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
                        {sideDataName == "roomTypes"
                          ? hotelsRows.map((item) => (
                              <TableCell>{item}</TableCell>
                            ))
                          : ""}
                        {sideDataName == "transportTypes"
                          ? transportRows.map((item) => (
                              <TableCell>{item}</TableCell>
                            ))
                          : ""}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row[sideDataName].length != 0 &&
                        row[sideDataName].map((room, index) => (
                          <TableRow key={index}>
                            {Object.keys(room).map((key) =>
                              `${sizeOfItemSide}` == key ? (
                                <TableCell width={140}>{room[key]}</TableCell>
                              ) : (
                                <TableCell width={280}>{room[key]}</TableCell>
                              )
                            )}
                            <TableCell>
                              <div
                                style={{
                                  cursor: "pointer",
                                  textAlign: "right",
                                }}
                                onClick={() => {
                                  editSideDataFunc(row.id, room);
                                }}
                              >
                                <EditIcon></EditIcon>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
                {addingSideData && (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      addingSideDataFunc(row.id);
                    }}
                  >
                    <p
                      style={{
                        fontSize: 14,
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        marginTop: 12,
                        marginBottom: 0,
                        color: "#0062B8",
                      }}
                    >
                      {sideDataName == "roomTypes" ? "+ Creating Room" : ""}
                      {sideDataName == "transportTypes"
                        ? "+ Creating Transport Types"
                        : ""}
                    </p>
                  </div>
                )}
              </Box>
            </Collapse>
          </TableCell>
        ) : (
          ""
        )}
      </TableRow>
    </>
  );
}
