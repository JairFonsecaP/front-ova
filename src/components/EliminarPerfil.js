import React, { useState } from "react";
import { Card, Alert, Space, Button } from "antd";
import api from "../assets/js/api";
import axios from "axios";
import { useHistory } from "react-router-dom";

const EliminarPerfil = (props) => {
  const history = useHistory();
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const eliminar = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${api}profesor/eliminar/${props.user.id}`,
        { headers: { token: props.token } }
      );
      console.log(typeof response.data.eliminados);
      if (response.data.eliminados > 0) {
        sessionStorage.removeItem("token");
        props.setToken(undefined);
        props.user(undefined);
        history.push("/");
      } else {
        setError("No se pudo eliminar la cuenta, por favor intente nuevamente");
      }
    } catch (error) {
      setError("No se pudo eliminar la cuenta, por favor intente nuevamente");
    }
    setLoading(false);
  };
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="ELIMINAR CUENTA"
        bordered={true}
        style={{ width: 500, margin: "20px auto" }}
      >
        <Alert
          message="¿Estás seguro?"
          description="Recuerda que si eliminas esta cuenta no podrás ingresar nuevamente al panel de administradores."
          type="error"
          action={
            <Space direction="vertical">
              <Button
                size="medium"
                type="primary"
                onClick={() => history.push("/dashboard/contacto")}
                style={{ width: "100px" }}
              >
                Cancelar
              </Button>
              <Button
                size="medium"
                danger
                loading={loading}
                type="ghost"
                style={{ width: "100px" }}
                onClick={() => {
                  eliminar();
                }}
              >
                Eliminar
              </Button>
            </Space>
          }
        />
        {error && (
          <Alert
            message={error}
            type="warning"
            showIcon
            style={{ margin: "10px auto" }}
          />
        )}
      </Card>
    </div>
  );
};

export default EliminarPerfil;
