import React, { useState } from "react";
import { Form, Input, Button, Card, Alert } from "antd";
import { PropertySafetyTwoTone, SaveFilled } from "@ant-design/icons";
import axios from "axios";
import api from "../assets/js/api";
import { useHistory } from "react-router-dom";

const AgregarAdministrador = (props) => {
  const history = useHistory();
  const [message, setMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${api}profesor/register`, values, {
        headers: { token: props.token },
      });

      if (response.data.error) {
        setMessage(response.data.error);
        setLoading(false);
        setTimeout(() => {
          setMessage(undefined);
        }, 5000);
      } else {
        history.push("/dashboard/administradores");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Card
        style={{ maxWidth: "800px", margin: "30px auto" }}
        title="Nuevo administrador"
      >
        {message && (
          <Alert
            style={{ marginBottom: "10px" }}
            message="Error"
            description={message}
            type="error"
            showIcon
          />
        )}
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Nombre"
            name="nombre"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre del nuevo administrador!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="E-mail"
            name="email"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Por favor ingrese el email del nuevo administrador!",
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
            hasFeedback
            rules={[
              {
                required: true,
                message: "Ingrese una contraseña",
              },
              {
                min: 8,
                message: "La contraseña debe tener minimo 8 caracteres",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirme contraseña"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                min: 8,
                message: "La contraseña debe tener minimo 8 caracteres",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Las contaseñas no coinciden!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              icon={<SaveFilled />}
            >
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AgregarAdministrador;
