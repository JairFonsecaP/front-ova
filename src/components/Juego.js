import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../assets/js/api";
import { Rate, Progress, Button, Card, Radio, Result } from "antd";
import { HeartFilled, RightOutlined } from "@ant-design/icons";

const Juego = () => {
  const history = useHistory();

  const [preguntas, setPreguntas] = useState([]);
  const [numeroPreguntas, setNumeroPreguntas] = useState(0);
  const [vidas, setVidas] = useState(5);
  const [progresoTotal, setProgresoTotal] = useState(0);
  const [progreso, setProgreso] = useState(0);
  const [paso, setPaso] = useState(0);
  const [score, setScore] = useState(0);
  const [respuesta, setRespuesta] = useState(undefined);

  const init = async () => {
    try {
      const response = await axios.get(`${api}juego/list-trivia`);
      setPreguntas(response.data.preguntas);
      setNumeroPreguntas(response.data.largo);
      setProgresoTotal(100 / response.data.largo);
      setProgreso(100 / response.data.largo);
    } catch (e) {
      console.log(e);
    }
  };

  const next = async () => {
    if (respuesta === preguntas[paso].respuestaCorrecta) {
      setScore(score + 1);
    } else {
      setVidas(vidas - 1);
      if (vidas === 1) {
        history.push("/ova/juego/juego-perdido");
      }
    }
    setPaso(paso + 1 > numeroPreguntas ? numeroPreguntas - 1 : paso + 1);
    setProgreso(
      progreso + progresoTotal > 100 ? 100 : progreso + progresoTotal
    );
    setRespuesta(undefined);
  };
  const onChange = (e) => {
    setRespuesta(e.target.value);
  };
  const finalizar = async () => {
    if (respuesta === preguntas[paso].respuestaCorrecta) {
      setScore(score + 1);
    } else {
      setVidas(vidas - 1);
      if (vidas === 0) {
        history.push("/ova/juego/juego-perdido");
      }
    }
    setProgreso(
      progreso + progresoTotal > 100 ? 100 : progreso + progresoTotal
    );
    const { email, nombre, curso } = JSON.parse(
      sessionStorage.getItem("estudiante")
    );
    await axios.post(`${api}resultados/add`, {
      nombre,
      email,
      curso,
      vidas,
      puntaje: score,
    });
    //sessionStorage.removeItem("estudiante");
    history.push("/ova/juego/resultado");
  };
  useEffect(() => {
    init();
  }, []);
  return preguntas.length > 0 ? (
    <div style={{ textAlign: "center" }}>
      <Progress
        style={{ maxWidth: "800px", marginTop: "50px" }}
        percent={progreso}
        showInfo={false}
        status="active"
        strokeColor="#ff1780"
        // strokeColor={{ "0%": "#ff1780", "100%": "#000" }}
        size="x-large"
      />
      <Card
        title={
          <Rate
            disabled
            count={numeroPreguntas}
            value={score}
            style={{ fontSize: 24 }}
          />
        }
        style={{
          maxWidth: "800px",
          maxHeight: "600px",
          margin: "auto",
          marginTop: "0px",
          textAlign: "left",
        }}
        extra={[
          <Rate
            character={<HeartFilled />}
            style={{ fontSize: 24, color: "red" }}
            value={vidas}
            disabled
          />,
        ]}
        actions={
          numeroPreguntas > paso + 1
            ? [
                <Button
                  type="primary"
                  shape="round"
                  icon={<RightOutlined />}
                  size="large"
                  onClick={() => {
                    next();
                  }}
                  disabled={respuesta ? false : true}
                >
                  Siguiente
                </Button>,
              ]
            : [
                <Button
                  type="primary"
                  shape="round"
                  icon={<RightOutlined />}
                  size="large"
                  onClick={() => {
                    finalizar();
                  }}
                  disabled={respuesta ? false : true}
                >
                  Finalizar
                </Button>,
              ]
        }
      >
        <Card
          title={preguntas[paso].pregunta}
          bordered
          style={{ boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.15)" }}
        >
          <Radio.Group onChange={onChange} value={respuesta}>
            <Radio.Button value="A" style={{ margin: "20px 50px" }}>
              {preguntas[paso].respuestaA}
            </Radio.Button>
            <Radio.Button value="B" style={{ margin: "20px 50px" }}>
              {preguntas[paso].respuestaB}
            </Radio.Button>
            <Radio.Button value="C" style={{ margin: "20px 50px" }}>
              {preguntas[paso].respuestaC}
            </Radio.Button>
            <Radio.Button value="D" style={{ margin: "20px 50px" }}>
              {preguntas[paso].respuestaD}
            </Radio.Button>
          </Radio.Group>
        </Card>
      </Card>
    </div>
  ) : (
    <Result
      status="500"
      title="500"
      subTitle="Hemos tenido un error por favor vulva a intentarlo"
      extra={
        <Button type="primary" onClick={() => init()}>
          Recargar
        </Button>
      }
    />
  );
};

export default Juego;
