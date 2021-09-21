import React from "react";
import { Spin } from "antd";

const Cargando = () => {
  return (
    <div
      style={{
        width: "800px",
        height: "600px",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(103,95,95,0.50)",
        zIndex: 10000000000,
      }}
    >
      <Spin size="large" />
      <h3>Cargando...</h3>
    </div>
  );
};
export default Cargando;
