import React, { useState } from "react";
import { Card, Form, Input, Button, Alert, Spin } from "antd";
import api from "../assets/js/api";
import axios from "axios";
import "../assets/css/formulario.css";

const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    const { data } = await axios.post(`${api}contacto/registro`, values);
    setMessage(data);

    if (data.type === "success") {
      form.resetFields();
    }
    setLoading(false);
    setTimeout(() => {
      setMessage(undefined);
    }, 5000);
  };

  const onFinishFailed = (errorInfo) => {};
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="Contactanos"
        bordered={true}
        style={{ width: 600, margin: "auto" }}
        extra={loading && <Spin size="large" />}
      >
        <Form
          form={form}
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
            label="Nombre"
            name="nombre"
            rules={[
              {
                required: true,
                message: "Campo requerido",
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
                message: "Campo requerido",
              },
              {
                type: "email",
                message: "Ingrese un email valido",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telefono"
            name="telefono"
            rules={[
              {
                required: true,
                message: "Campo requerido",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Comentario"
            name="comentario"
            rules={[
              {
                required: true,
                message: "Campo requerido",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          {message && (
            <Alert
              message={message.title}
              description={message.message}
              type={message.type}
              showIcon
              closable
              style={{ marginBottom: "15px" }}
            />
          )}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button loading={loading} type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Contact;
