import React, { useState, useEffect } from "react";
import { Table, Alert } from "antd";
import axios from "axios";
import api from "../assets/js/api";

const columns = [
  {
    title: "Nombre",
    dataIndex: "nombre",
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 150,
  },
  {
    title: "Telefono",
    dataIndex: "telefono",
    width: 150,
  },
  {
    title: "Fecha",
    dataIndex: "createdAt",
    width: 150,
  },
  {
    title: "Hora",
    dataIndex: "hora",
    width: 150,
  },
  {
    title: "Comentario",
    dataIndex: "comentario",
  },
];

const Contacto = (props) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const init = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}contacto/list`, {
        headers: { token: props.token },
      });
      if (!response.data.error) {
        response.data.map((one, index) => {
          const fecha = new Date(one.createdAt);
          one.key = one.createdAt + index;
          one.hora = `${
            fecha.getHours() <= 9 ? `0${fecha.getHours()}` : fecha.getHours()
          }:${
            fecha.getMinutes() <= 9
              ? `0${fecha.getMinutes()}`
              : fecha.getMinutes()
          }:${
            fecha.getSeconds() <= 9
              ? `0${fecha.getSeconds()}`
              : fecha.getSeconds()
          }`;
          one.createdAt = `${
            fecha.getDate() <= 9 ? `0${fecha.getDate()}` : fecha.getDate()
          }/${
            fecha.getMonth() <= 9 ? `0${fecha.getMonth()}` : fecha.getMonth()
          }/${fecha.getFullYear()}`;
          return one;
        });
        setData(response.data);
      } else {
        setError(response.data.error);
        props.setToken(undefined);
        props.setUser(undefined);
        sessionStorage.removeItem("token");
        setTimeout(() => {
          setError(undefined);
        }, 5000);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <div style={{ margin: "20px auto" }}>
        {error && (
          <Alert type="error" message="Error" showIcon description={error} />
        )}
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 20 }}
        />
      </div>
    </div>
  );
};
export default Contacto;
