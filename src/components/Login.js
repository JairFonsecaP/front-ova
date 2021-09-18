import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Alert } from "antd";
import axios from "axios";
import api from "../assets/js/api";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();
  const [message, setMessage] = useState(undefined);

  const onFinish = async (values) => {
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
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="Iniciar sesión"
        bordered={false}
        style={{ width: 800, margin: "auto" }}
      >
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
            <Button type="primary" htmlType="submit">
              Iniciar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
