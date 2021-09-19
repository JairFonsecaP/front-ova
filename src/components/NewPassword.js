import React, { useState } from "react";
import { Card, Form, Input, Alert, Button } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
import api from "../assets/js/api";

const NewPassword = (props) => {
  const history = useHistory();

  const [message, setMessage] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [intentos, setIntentos] = useState(
    localStorage.getItem("intentos")
      ? parseInt(localStorage.getItem("intentos")) + 1
      : 1
  );

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${api}profesor/new-password/${props.user.id}`,
        values,
        { headers: { token: props.token } }
      );
      console.log(response);
      if (response.data.message) {
        if (!localStorage.getItem("intentos")) {
          localStorage.setItem("intentos", 0);
        }
        setIntentos(intentos + 1);
        localStorage.setItem("intentos", intentos);
        setError(`${response.data.message} le quedan ${3 - intentos} intentos`);
        if (intentos === 3) {
          props.setToken(undefined);
          props.setUser(undefined);
          sessionStorage.removeItem("token");
          localStorage.removeItem("intentos");
          history.push("/login");
        }
      }
      if (response.data[0] > 0) {
        props.setToken(undefined);
        props.setUser(undefined);
        sessionStorage.removeItem("token");
        localStorage.removeItem("intentos");
        history.push("/login");
      } else {
        setMessage(
          "No se pudo cambiar la contraseña por favor intente nuevamente"
        );
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const onFinishFailed = (errorInfo) => {
    setError("Ingrese una contraseña");
    setTimeout(() => setError(undefined), 5000);
  };

  return (
    <Form
      className="formPw"
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Card
        style={{ maxWidth: 800, margin: "auto", marginTop: 50 }}
        className="password"
        title="Cambiar Contraseña"
        actions={[
          <Button type="primary" htmlType="submit" loading={loading}>
            Editar contraseña
          </Button>,
          <Button
            type="reset"
            htmlType="reset"
            onClick={() => history.goBack()}
            loading={loading}
          >
            ← Volver
          </Button>,
        ]}
        wrapperCol={{
          span: 16,
        }}
      >
        <div style={{ margin: "10px auto" }}>
          {message ? <Alert message={message} type="success" /> : null}
          {error ? <Alert message={error} type="error" /> : null}
        </div>
        <Form.Item
          label="Contraseña actual"
          name="oldPassword"
          hasFeedback
          rules={[
            {
              required: true,
              min: 8,
              message: "La contraseña debe tener minimo 8 caracteres",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Nueva contraseña"
          name="newPassword"
          dependencies={["oldPassword"]}
          rules={[
            {
              required: true,
              min: 8,
              message: "La contraseña debe tener minimo 8 caracteres",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("oldPassword") !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "La contraseña actual y la nueva no pueden ser las mismas"
                  )
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirme contraseña"
          name="confirmPassword"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              min: 8,
              message: "La contraseña debe tener minimo 8 caracteres",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
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
      </Card>
    </Form>
  );
};

export default NewPassword;
