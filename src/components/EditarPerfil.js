import React, { useState } from "react";
import { Card, Form, Button, Input, Alert } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import axios from "axios";
import api from "../assets/js/api";

const EditarPerfil = (props) => {
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${api}profesor/editar/${props.user.id}`,
        values,
        { headers: { token: props.token } }
      );
      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        props.setToken(response.data.token);
        //history.push("/dashboard/contacto");
      }
    } catch (error) {
      setError("Error inesperado, por favor intente nuevamente");
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  return (
    <div>
      <Form
        initialValues={props.user}
        name="basic"
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 20,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Card
          title="Editar perfil"
          style={{ margin: "20px auto", maxWidth: "700px" }}
          actions={[
            <Button
              icon={<SaveOutlined />}
              htmlType="submit"
              type="primary"
              loading={loading}
            >
              Guardar
            </Button>,
          ]}
        >
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[
              {
                required: true,
                message: "Por favor ingrese un nombre",
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
                required: true,
                message: "Por favor ingrese su email",
              },
              {
                type: "email",
                message: "Por favor ingrese un email valido",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Alert
            type="success"
            showIcon
            message="Recuerda a la proxima vez iniciar sesión con este nuevo correo"
          />
          {error && (
            <Alert
              type="error"
              showIcon
              message={error}
              style={{ marginTop: "10px" }}
            />
          )}
        </Card>
      </Form>
    </div>
  );
};

export default EditarPerfil;
