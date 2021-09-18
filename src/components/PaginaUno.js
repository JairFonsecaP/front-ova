import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "antd";
import { Progress } from "antd";
import {
  ReloadOutlined,
  AudioOutlined,
  AudioMutedOutlined,
  HomeOutlined,
  CaretRightOutlined,
  PauseOutlined,
  FastForwardOutlined,
  FastBackwardOutlined,
} from "@ant-design/icons";
import ReactPlayer from "react-player";
import "../assets/css/ova.css";

const PaginaUno = () => {
  const [estudiante, setEstudiante] = useState({});
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const init = () => {
    setEstudiante(JSON.parse(sessionStorage.getItem("estudiante")));
  };
  const pause = () => {
    setPaused(!paused);
  };

  const reiniciar = () => {
    const container = document.getElementById("vid");
    let video = container.querySelector("video");
    video.currentTime = 0;
  };

  useEffect(() => {
    init();
    setTimeout(() => {
      pause();
    }, 1000);
  }, []);
  return (
    <div style={{ height: "100vh", backgroundColor: "#26447f" }}>
      <h1 style={{ color: "#fff", textAlign: "center", padding: "10px" }}>
        Hola {estudiante.nombre}
      </h1>
      <div className="progreso">
        <Progress
          percent={progreso}
          showInfo={false}
          status="active"
          strokeColor="#ff1780"
          size="x-large"
        />
      </div>
      <div className="contenedor">
        <div>
          <div className="botonera">
            <Tooltip
              title="Retroceder"
              onClick={() => {
                setProgreso(progreso > 0 ? progreso - 10 : 0);
              }}
            >
              <Button
                shape="circle"
                size="large"
                icon={<FastBackwardOutlined />}
              />
            </Tooltip>
            <Tooltip
              title="Avanzar"
              onClick={() => {
                setProgreso(progreso < 100 ? progreso + 10 : 100);
              }}
            >
              <Button
                shape="circle"
                size="large"
                icon={<FastForwardOutlined />}
              />
            </Tooltip>

            <Tooltip title="Inicio">
              <Button shape="circle" size="large" icon={<HomeOutlined />} />
            </Tooltip>

            <Tooltip
              title="Volver a reproducir"
              onClick={() => {
                reiniciar();
              }}
            >
              <Button shape="circle" size="large" icon={<ReloadOutlined />} />
            </Tooltip>

            <Tooltip
              title={paused ? "Pausar" : "Reanudar"}
              onClick={() => {
                pause();
              }}
            >
              <Button
                shape="circle"
                size="large"
                icon={paused ? <PauseOutlined /> : <CaretRightOutlined />}
              />
            </Tooltip>
            <Tooltip
              title={!muted ? "Silenciar" : "Activar sonido"}
              onClick={() => setMuted(!muted)}
            >
              <Button
                shape="circle"
                size="large"
                icon={!muted ? <AudioOutlined /> : <AudioMutedOutlined />}
              />
            </Tooltip>
          </div>
          <div className="player">
            <ReactPlayer
              id="vid"
              url={"https://www.youtube.com/watch?v=9_pIaI93YGY"}
              width="800px"
              height="600px"
              playing={paused}
              muted={muted}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaginaUno;
