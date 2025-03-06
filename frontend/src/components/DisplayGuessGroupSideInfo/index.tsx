import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { MockImage } from "../../assets/index";
export function DisplayGuessGroupSideInfo({
  title = "Transport information",
  guessGroupData,
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
  options = "Restaurant",
  editFunc,
  editSignal = true,
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
                marginTop: "-3px",
                marginBottom: 19,
                color: "#005FB3",
                fontSize: 24,
              }}
            >
              {title}
            </h3>
          </div>
          <div
            style={{ cursor: "pointer", marginBottom: 19 }}
            onClick={editFunc}
          >
            {editSignal && <EditIcon></EditIcon>}
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
              src="https://media.discordapp.net/attachments/1275330228637536333/1347190331724005397/transport.png?ex=67caec44&is=67c99ac4&hm=31bcbef677005556a4529db67869f9084fecef0a93b78c89fe6986392fc807f5&=&format=webp&quality=lossless"
            ></img>

            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0", fontWeight: "bold", fontSize: 24 }}>
                {guessGroupData?.transport?.brand}
              </h4>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Transport type:</strong>{" "}
                {guessGroupData?.transport?.transport_type}
              </p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Price:</strong> {guessGroupData?.transport?.price} VNĐ
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
                <strong>Remark:</strong>{" "}
                {guessGroupData?.transport_remark || ""}
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
              src="https://media.discordapp.net/attachments/1275330228637536333/1347190330948059187/hotel.png?ex=67caec44&is=67c99ac4&hm=de397f5379385ae1714c816753c4c892ecc8358c76ed3aac011a830c85d49254&=&format=webp&quality=lossless&width=849&height=856"
            ></img>

            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0", fontWeight: "bold", fontSize: 24 }}>
                {guessGroupData?.hotel?.name}
              </h4>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Address: </strong>

                {guessGroupData?.hotel?.address}
              </p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Contact: </strong>
                {guessGroupData?.hotel?.contact}
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
                <strong>Remark:</strong> {guessGroupData?.hotel_remark}
              </div>
            </div>
          </div>
        )}
        {options == "Restaurant" && (
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
              src="https://media.discordapp.net/attachments/1275330228637536333/1347190331342454886/restaurant.png?ex=67caec44&is=67c99ac4&hm=74ddcb053b82631113d163518f66e901871d8276bc9c538ef21b539b063e6287&=&format=webp&quality=lossless"
            ></img>

            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0", fontWeight: "bold", fontSize: 24 }}>
                {guessGroupData?.restaurant?.name}
              </h4>

              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Cuisine type: </strong>
                {guessGroupData?.restaurant?.cuisine}
              </p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Contact: </strong>
                {guessGroupData?.restaurant?.contact}
              </p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Address: </strong>
                {guessGroupData?.restaurant?.address}
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
                <strong>Remark:</strong> {guessGroupData?.dish_remark}
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
        <p
          style={{
            fontWeight: 700,
            marginTop: "5%",
            marginBottom: 19,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          The information will be updating after contacting service prodiver
        </p>
      </div>
    </div>
  );
}
