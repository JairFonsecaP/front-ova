import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import api from "../assets/js/api";

const Administradores = (props) => {
  const [data, setData] = useState([]);
  const [columnas, setColumnas] = useState([]);

  const init = async () => {
    const response = await axios(`${api}profesor/list`, {
      headers: { token: props.token },
    });
    setData(response.data);
    setColumnas([
      {
        title: "Nombre",
        dataIndex: "nombre",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
    ]);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <Table
        dataSource={data}
        columns={columnas}
        style={{ margin: "30px auto" }}
      />
    </div>
  );
};

export default Administradores;
