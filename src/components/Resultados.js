import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
import api from "../assets/js/api";
const Resultados = (props) => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Curso",
      dataIndex: "curso",
    },
    {
      title: "Puntaje",
      dataIndex: "puntaje",
      sorter: {
        compare: (a, b) => a.puntaje - b.puntaje,
        multiple: 3,
      },
    },
    {
      title: "Vidas",
      dataIndex: "vidas",
      sorter: {
        compare: (a, b) => a.vidas - b.vidas,
        multiple: 5,
      },
    },
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const init = async () => {
    setLoading(true);
    const response = await axios.get(`${api}resultados/list`, {
      headers: { token: props.token },
    });
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <Table
        loading={loading}
        style={{ margin: "20px auto" }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};
export default Resultados;
