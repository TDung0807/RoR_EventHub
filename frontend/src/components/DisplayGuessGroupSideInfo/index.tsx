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
              src="https://vinfast-binhduong.vn/wp-content/uploads/2024/05/img9.webp"
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
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/375261727.jpg?k=4f4e47cc7b14899307b6d9e6643f0ecbfd847f3dd42066d978107f0c2fbce37a&o=&hp=1"
            ></img>

            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0", fontWeight: "bold", fontSize: 24 }}>
                {guessGroupData?.hotel?.name}
              </h4>
              <p style={{ margin: "5px 0", color: "#555" }}>
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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-sV3bNJlRSXFJqzRl1KyD694gHNZ4TZILg&s"
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
      </div>
    </div>
  );
}
