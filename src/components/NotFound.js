import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Disculpa, la pagina que está visitando no existe"
      extra={
        <Link to="/">
          <Button type="primary">Inicio</Button>
        </Link>
      }
    />
  );
}
export default NotFound;
