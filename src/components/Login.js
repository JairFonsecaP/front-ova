import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Alert } from "antd";
import axios from "axios";
import api from "../assets/js/api";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();
  const [message, setMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const { data } = await axios.post(`${api}profesor/login`, values);

    if (data.token) {
      props.setToken(data.token);
      sessionStorage.setItem("token", data.token);
      history.push("/dashboard/contacto");
    } else {
      setMessage(data.message);
      setTimeout(() => {
        setMessage(undefined);
      }, 5000);
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Card
          title="Iniciar sesión"
          bordered={false}
          bordered
          style={{ maxWidth: 800, margin: "100px auto" }}
          actions={[
            <Button loading={loading} type="primary" htmlType="submit">
              Iniciar
            </Button>,
            <Button
              loading={loading}
              onClick={() => {
                history.push("/");
              }}
            >
              Atras
            </Button>,
          ]}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Campo requerido",
              },
              {
                type: "email",
                message: "Por favor ingrese un email valido",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              {
                required: true,
                message: "Campo requerido",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            {message && (
              <Alert
                message="Error"
                description={message}
                type="error"
                showIcon
                style={{ width: "300px", marginBottom: "10px" }}
              />
            )}
          </Form.Item>
        </Card>
      </Form>
    </div>
  );
};

export default Login;
