import React, { useState } from "react";
import { Card, Form, Input, Button } from "antd";
import { SendOutlined, EditFilled } from "@ant-design/icons";
import axios from "axios";
import api from "../assets/js/api";
import { useHistory } from "react-router-dom";

const NuevoCurso = (props) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const onFinish = async (values) => {
    setLoading(true);
    values.estado = true;
    try {
      const response = await axios.post(`${api}cursos/add`, values, {
        headers: { token: props.token },
      });
      if (!response.data.error) {
        history.push("/dashboard/cursos");
      } else {
        props.setToken(undefined);
        props.setUser(undefined);
        sessionStorage.removeItem("token");
        history.push("/login");
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
      >
        <Card
          title={"Nuevo curso"}
          style={{ maxWidth: 700, margin: "auto", marginTop: "20px" }}
          actions={[
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SendOutlined key="setting" />}
            >
              Enviar
            </Button>,
          ]}
        >
          <Form.Item
            label="Curso"
            name="curso"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el curso que desea agregar",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Card>
      </Form>
    </div>
  );
};

export default NuevoCurso;
