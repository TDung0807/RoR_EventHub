import React from "react";
import EditIcon from "@mui/icons-material/Edit";

export function DisplayGuessGroupSideInfo({
  title = "Transport information",
  transportInfo = {
    transportName: "Cam SM",
    transportType: "4 seats",
    hotelPickupTime: "10:00 on 15 December, 2024",
    officePickupTime: "10:00 on 15 December, 2024",
    transportRemark: "",
  },
  hotelInfo = {
    hotelName: "Royal Hotel",
    hotelAddress:
      "123 Le Duan Street, Ben Nghe Ward, District 1, Ho Chi Minh City",
    hotelContact: "09090909009",
    hotelAttractment: "",
    hotelRemake: "",
  },
  cursineInfo = {
    cursineName: "Thien Ly Beefsteak",
    cursineRestaurant: "JSteak",
    cursineType: "European",
    cursineMainIngre: "Beef",
    cursineRemake: "",
  },
  remark = "",
  options = "Lunchbox",
  setOpenSideModal,
  setActionSideModal,
  ...props
}) {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 38,
          padding: 38,
          marginLeft: "80px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 16 }}>
            <h3
              style={{
                marginTop: "-7px",
                marginBottom: 19,
                color: "#005FB3",
                fontSize: 24,
              }}
            >
              {title}
            </h3>
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpenSideModal(true);
              setActionSideModal("Edit");
            }}
          >
            <EditIcon></EditIcon>
          </div>
        </div>
        {options == "Transport" && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 20,
            }}
          >
            {/* Image Placeholder */}
            <img
              style={{
                width: 168,
                minHeight: "201px",
                backgroundColor: "#ddd",
                borderRadius: 10,
                margin: 0,
              }}
            ></img>

            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0", fontWeight: "bold", fontSize: 24 }}>
                {transportInfo.transportName}
              </h4>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Transport type:</strong> {transportInfo.transportType}
              </p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Hotel pickup time: </strong>
                {transportInfo.hotelPickupTime}
              </p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Office pickup time: </strong>
                {transportInfo.officePickupTime}
              </p>

              {/* Remarks Section */}
              <div
                style={{
                  marginTop: 20,
                  padding: 10,
                  backgroundColor: "#f5faff",
                  borderRadius: 10,
                  color: "#555",
                }}
              >
                <strong>Remark:</strong> {transportInfo.transportRemark}
              </div>
            </div>
          </div>
        )}
        {options == "Hotel" && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 20,
            }}
          >
            {/* Image Placeholder */}
            <img
              style={{
                width: 168,
                minHeight: "201px",
                backgroundColor: "#ddd",
                borderRadius: 10,
                margin: 0,
              }}
            ></img>

            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0", fontWeight: "bold", fontSize: 24 }}>
                {hotelInfo.hotelName}
              </h4>
              <p style={{ margin: "5px 0", color: "#555" }}>
                {hotelInfo.hotelAddress}
              </p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Contact: </strong>
                {hotelInfo.hotelContact}
              </p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Attractment: </strong>
                {hotelInfo.hotelAttractment}
              </p>

              {/* Remarks Section */}
              <div
                style={{
                  marginTop: 20,
                  padding: 10,
                  backgroundColor: "#f5faff",
                  borderRadius: 10,
                  color: "#555",
                }}
              >
                <strong>Remark:</strong> {hotelInfo.hotelRemake}
              </div>
            </div>
          </div>
        )}
        {options == "Lunchbox" && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 20,
            }}
          >
            {/* Image Placeholder */}
            <img
              style={{
                width: 168,
                minHeight: "201px",
                backgroundColor: "#ddd",
                borderRadius: 10,
                margin: 0,
              }}
            ></img>

            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0", fontWeight: "bold", fontSize: 24 }}>
                {cursineInfo.cursineName}
              </h4>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Restaurant: </strong>
                {cursineInfo.cursineRestaurant}
              </p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Cuisine type: </strong>
                {cursineInfo.cursineType}
              </p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Main ingredient: </strong>
                {cursineInfo.cursineMainIngre}
              </p>

              {/* Remarks Section */}
              <div
                style={{
                  marginTop: 20,
                  padding: 10,
                  backgroundColor: "#f5faff",
                  borderRadius: 10,
                  color: "#555",
                }}
              >
                <strong>Remark:</strong> {cursineInfo.cursineRemake}
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 38,
          padding: 38,
          marginTop: "27px",
          marginLeft: "80px",
        }}
      >
        <h3
          style={{
            marginTop: "-5px",
            marginBottom: 19,
            color: "#005FB3",
            fontSize: 24,
          }}
        >
          Response
        </h3>
      </div>
    </div>
  );
}
