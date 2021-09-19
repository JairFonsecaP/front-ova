import React, { useState, useEffect } from "react";
import { Table, Switch, Popconfirm } from "antd";
import axios from "axios";
import api from "../assets/js/api";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const Preguntas = (props) => {
  const history = useHistory();
  const columns = [
    {
      title: "Pregunta",
      dataIndex: "pregunta",
    },
    {
      title: 'Respuesta "A"',
      dataIndex: "respuestaA",
      width: 150,
    },
    {
      title: 'Respuesta "B"',
      dataIndex: "respuestaB",
      width: 150,
    },
    {
      title: 'Respuesta "C"',
      dataIndex: "respuestaC",
      width: 150,
    },
    {
      title: 'Respuesta "D"',
      dataIndex: "respuestaD",
      width: 150,
    },
    {
      title: "Respuesta Correcta",
      dataIndex: "respuestaCorrecta",
      width: 150,
    },
    {
      title: "Editar",
      width: 150,
      key: "createdAt",
      render: (pregunta) => (
        <EditOutlined
          style={{ fontSize: 20 }}
          key={pregunta.createdAt}
          onClick={() => {
            props.setEditar(pregunta);
            history.push("/dashboard/editar/pregunta");
          }}
        />
      ),
    },
    {
      title: "Acitvo/Inactivo",
      width: 150,
      key: "id",
      render: (pregunta) => (
        <Switch
          key={pregunta.id}
          defaultChecked={pregunta.estado}
          size="small"
          onChange={async () => {
            setLoading(true);
            await axios.patch(
              `${api}juego/activate-deactivate/${pregunta.id}`,
              { estado: !pregunta.estado },
              { headers: { token: props.token } }
            );
            setLoading(false);
          }}
        />
      ),
    },
    {
      title: "Eliminar",
      width: 150,
      key: "createdAt",
      render: (pregunta) => (
        <Popconfirm
          title="¿Seguro que quiere eliminar?"
          cancelText="Cancelar"
          okText="Eliminar"
          onConfirm={async () => {
            setLoading(true);
            try {
              await axios.delete(`${api}juego/eliminar/${pregunta.id}`, {
                headers: { token: props.token },
              });
              init();
            } catch (e) {
              console.log(e);
            }
            setLoading(false);
          }}
        >
          <DeleteFilled style={{ fontSize: 20 }} />
        </Popconfirm>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const init = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}juego/list`, {
        headers: { token: props.token },
      });

      setData(response.data.preguntas);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 20 }}
    />
  );
};

export default Preguntas;
