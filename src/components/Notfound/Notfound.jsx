import React from "react";
import img from "./image.png";

export default function Notfound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <img
        src={img}
        style={{ width: "50%", maxWidth: "600px", height: "auto" }}
        alt="Not Found"
      />
    </div>
  );
}
