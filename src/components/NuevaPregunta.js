import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Checkbox, Select } from "antd";
import { SendOutlined, EditFilled } from "@ant-design/icons";
import axios from "axios";
import api from "../assets/js/api";
import { useHistory } from "react-router-dom";

const { Option } = Select;

const NuevaPregunta = (props) => {
  const history = useHistory();
  const [opciones, setOpciones] = useState(["A", "B", "C", "D"]);

  const onFinish = async (values) => {
    if (!props.editar) {
      await axios.post(`${api}juego/add`, values, {
        headers: { token: props.token },
      });

      history.push("/dashboard/preguntas");
    } else {
      await axios.patch(`${api}juego/edit/${props.editar.id}`, values, {
        headers: { token: props.token },
      });

      history.push("/dashboard/preguntas");

      props.setEditar(undefined);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    document.querySelector("form").reset();
  }, [props.editar]);

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
        initialValues={props.editar}
      >
        <Card
          title={props.editar ? "Editar pregunta" : "Nueva pregunta"}
          style={{ maxWidth: 700, margin: "auto", marginTop: "20px" }}
          actions={[
            <Button
              type="primary"
              htmlType="submit"
              icon={
                !props.editar ? <SendOutlined key="setting" /> : <EditFilled />
              }
            >
              {props.editar ? "Editar" : "Enviar"}
            </Button>,
          ]}
        >
          <Form.Item
            label="Pregunta"
            name="pregunta"
            rules={[
              {
                required: true,
                message: "Por favor ingrese una pregunta",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Respuesta A"
            name="respuestaA"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la opción A",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Respuesta B"
            name="respuestaB"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la opción B",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Respuesta C"
            name="respuestaC"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la opción C",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Respuesta D"
            name="respuestaD"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la opción D",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="respuestaCorrecta"
            label="Respuesta Correcta"
            rules={[
              {
                required: true,
                message: "Por favor seleccione una respuesta correcta",
              },
            ]}
          >
            <Select placeholder="Seleccione la respuesta correcta">
              {opciones.map((one) => (
                <Option value={one} key={one}>
                  {one}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {!props.editar ? (
            <Form.Item
              name="estado"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
              valuePropName="checked"
            >
              <Checkbox>¿Quiere habilitar la pregunta?</Checkbox>
            </Form.Item>
          ) : null}
        </Card>
      </Form>
    </div>
  );
};

export default NuevaPregunta;
