import React from "react";
import EditIcon from "@mui/icons-material/Edit";

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
              src="https://media.discordapp.net/attachments/1275330228637536333/1346499469247512616/transport.png?ex=67c868da&is=67c7175a&hm=957e8af7a64c94e933342edafbfbc79348c90f7876ea215cc0abc8a514f3e498&=&format=webp&quality=lossless"
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
              src="https://media.discordapp.net/attachments/1275330228637536333/1346499468639604736/hotel.png?ex=67c868da&is=67c7175a&hm=6785b3a648edb3651d217727e1264a1a1bd4af41ba089b9404d5861fe29a9ed9&=&format=webp&quality=lossless&width=849&height=856"
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
              src="https://media.discordapp.net/attachments/1275330228637536333/1346499467867586652/restaurant.png?ex=67c868d9&is=67c71759&hm=41460abae3541929579b91ceb97af96f5f8510fd2b6d2710c7f91f4cc296f792&=&format=webp&quality=lossless"
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
