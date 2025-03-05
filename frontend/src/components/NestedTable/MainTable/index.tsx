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
import { sideIcon } from "../../../assets";
import { NestedRow } from "../NestedRow";
import ReactPaginate from "react-paginate";

// Main Table Component
export function MainTable({
  utilityRows,
  utilityData,
  sideData = null,
  editRef = false,
  editPre = "",
  action = [],
  addingSideData = false,
  addingSideDataFunc = (id) => {},
  editSideDataFunc = (id, room) => {},
  editEvent = (item) => {},
  deleteSideDataFunc = (id, room) => {},
  handleDeleteMainData = (row) => {},
  sideDataName = "",
  itemsPerPage = 10,
}) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const pageCount = Math.ceil(utilityData.length / itemsPerPage);
  let utilityDataRender = utilityData;
  if (utilityData != undefined || utilityData.length != 0) {
    utilityDataRender = utilityData.slice(itemOffset, endOffset);
  }
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % utilityData.length;
    setItemOffset(newOffset);
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {utilityData[0] != undefined &&
              utilityData[0][sideDataName] != undefined &&
              utilityData[0][sideDataName].length != 0 ? (
                <TableCell align="center"> </TableCell>
              ) : (
                ""
              )}

              {utilityRows.map((item, key) => (
                <TableCell align="center" key={key}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {utilityData == undefined || utilityData.length == 0 ? (
            <TableCell colSpan={utilityRows.length + 1} align="center">
              <img width={150} height={150} src={sideIcon.noData}></img>
            </TableCell>
          ) : (
            <TableBody>
              {utilityDataRender.map((utility) => (
                <NestedRow
                  editRef={editRef}
                  editPre={editPre}
                  sideData={sideData}
                  key={utility.id}
                  row={utility}
                  action={action}
                  editEvent={editEvent}
                  editSideDataFunc={editSideDataFunc}
                  addingSideDataFunc={addingSideDataFunc}
                  addingSideData={addingSideData}
                  sideDataName={sideDataName}
                  deleteSideDataFunc={deleteSideDataFunc}
                  handleDeleteMainData={handleDeleteMainData}
                />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <div style={{ textAlign: "center", marginLeft: "40%", marginTop: 8 }}>
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}
