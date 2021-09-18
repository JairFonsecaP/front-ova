import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import api from "../assets/js/api";
import { Form, Input, Button, Card, Select, Modal, Alert } from "antd";

const { Option } = Select;

const InicioOva = () => {
  const history = useHistory();
  const [cursos, setCursos] = useState([]);
  const [visible, setVisible] = useState(false);

  const onFinish = (values) => {
    sessionStorage.setItem("estudiante", JSON.stringify(values));
    history.push("/ova/uno");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const init = async () => {
    try {
      const response = await axios.get(`${api}cursos/list-ova`);
      setCursos(response.data);
      setVisible(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("estudiante")) {
      history.replace("/ova/uno");
    } else {
      init();
    }
  }, []);

  return cursos.length > 0 ? (
    <div className="site-card-border-less-wrapper">
      <Modal
        closable={false}
        title={<Alert message="Advertencia" type="warning" showIcon />}
        visible={visible}
        footer={[
          <Button
            key="continue"
            type="primary"
            onClick={() => {
              setVisible(false);
            }}
          >
            Continuar
          </Button>,
          <Button
            key="back"
            onClick={() => {
              history.push("/");
            }}
          >
            Salir
          </Button>,
        ]}
      >
        <p>
          Si su curso no aparezce en la lista, por favor salga de esta pagina.
        </p>
        <ul>
          {cursos.map((one, index) => (
            <li key={index + one.id}>{one.curso}</li>
          ))}
        </ul>
        <p>¡¡GRACIAS!!</p>
      </Modal>
      <Card
        title="Indique su nombre, correo y curso"
        bordered={false}
        style={{
          width: 500,
          margin: "30px auto",
          border: "1px solid #666",
          boxShadow: "7px 7px 7px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su nombre",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Por favor ingrese un correo valido",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Curso"
            name="curso"
            rules={[
              {
                required: true,
                message: "Por favor seleccione su curso",
              },
            ]}
          >
            <Select style={{ width: 120 }}>
              {cursos.map((curso, index) => (
                <Option value={curso.curso} key={index}>
                  {curso.curso}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Iniciar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  ) : (
    <Modal
      closable={false}
      title={<Alert message="Advertencia" type="error" showIcon />}
      visible={visible}
      footer={[
        <Button
          key="back"
          onClick={() => {
            history.push("/");
          }}
        >
          Salir
        </Button>,
      ]}
    >
      <p>
        El ova no está disponible ahora, por favor intente más tarde o pongase
        en contacto con su profesor.
      </p>

      <p>¡Disculpa!</p>
    </Modal>
  );
};

export default InicioOva;
