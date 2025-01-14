import React, { useState } from "react";

export function GroupChoosingButton({
  changingBtn,
  activeButton,
  setActiveButton,
  ...props
}) {
  const buttonStyle = (isActive) => ({
    flex: 1,
    padding: "10px 20px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    outline: "none",
    backgroundColor: isActive ? "#007bff" : "white",
    color: isActive ? "white" : "black",
    borderRadius: "0", // Adjust this if you want rounded edges.
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 20,
        marginLeft: 80,
        border: "1px solid #ccc",
        borderRadius: 10,
        overflow: "hidden",
        width: "fit-content",
      }}
    >
      {changingBtn.map((button) => (
        <button
          key={button}
          style={buttonStyle(activeButton === button)}
          onClick={() => setActiveButton(button)}
        >
          {button}
        </button>
      ))}
    </div>
  );
}
