import React, { useEffect, useState } from "react";
import { Table, Switch, Alert, Popconfirm } from "antd";
import axios from "axios";
import api from "../assets/js/api";
import { DeleteFilled } from "@ant-design/icons";

const Cursos = (props) => {
  const Toggle = (curso, token) => {
    return (
      <Switch
        key={curso.id}
        defaultChecked={curso.estado}
        size="small"
        onChange={async () => {
          const response = await axios.patch(
            `${api}cursos/activate-deactivate/${curso.id}`,
            { estado: !curso.estado },
            { headers: { token: token } }
          );
          if (response.data.error) {
            setMessage(response.data.error);
          } else {
            if (!response.data[0] > 0) {
              init();
              setMessage(
                `No se pudo activar el curso ${curso.curso} por favor intente de nuevo.`
              );
              setTimeout(() => setMessage(undefined), 5000);
            }
          }
        }}
      />
    );
  };
  const columns = [
    {
      title: "Curso",
      dataIndex: "curso",
      key: "curso",
    },
    {
      title: "Acitvo/Inactivo",
      width: 150,
      key: "id",
      render: (curso) => Toggle(curso, props.token),
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
            try {
              await axios.delete(`${api}cursos/eliminar/${pregunta.id}`, {
                headers: { token: props.token },
              });
              init();
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <DeleteFilled style={{ fontSize: 20 }} />
        </Popconfirm>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [message, setMessage] = useState(undefined);

  const init = async () => {
    const response = await axios.get(`${api}cursos/list`, {
      headers: { token: props.token },
    });
    setData(response.data);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <div style={{ marginTop: "20px auto" }}>
      {message && (
        <Alert
          style={{ margin: "10px 0" }}
          type="error"
          showIcon
          message={message}
        />
      )}
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default Cursos;
