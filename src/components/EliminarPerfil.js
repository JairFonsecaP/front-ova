import React from "react";
import { Card } from "antd";

const EliminarPerfil = (props) => {
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="Card title"
        bordered={true}
        style={{ width: 300, margin: "auto" }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
};

export default EliminarPerfil;
