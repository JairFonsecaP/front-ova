import React, { useEffect, useState } from "react";
import animacion from "../assets/images/giphy.gif";
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
import video_ova from "../assets/videos/video.mp4";
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
  // const pantalla = () => {
  //   var tam = [0, 0];
  //   if (typeof window.innerWidth != "undefined") {
  //     tam = [window.innerWidth, window.innerHeight];
  //   } else if (
  //     typeof document.documentElement != "undefined" &&
  //     typeof document.documentElement.clientWidth != "undefined" &&
  //     document.documentElement.clientWidth != 0
  //   ) {
  //     tam = [
  //       document.documentElement.clientWidth,
  //       document.documentElement.clientHeight,
  //     ];
  //   } else {
  //     tam = [
  //       document.getElementsByTagName("body")[0].clientWidth,
  //       document.getElementsByTagName("body")[0].clientHeight,
  //     ];
  //   }
  //   console.log(tam);
  // };
  const reiniciar = () => {
    const container = document.getElementById("vid");
    let video = container.querySelector("video");
    video.currentTime = 0;
  };

  useEffect(() => {
    // pantalla();
    init();
    setTimeout(() => {
      pause();
    }, 1000);
  }, []);
  return (
    // {window.screen}
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
          // strokeColor={{ "0%": "#ff1780", "100%": "#000" }}
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
              url={video_ova}
              width="800px"
              height="600px"
              playing={paused}
              muted={muted}
            />
            {/* <img
              src={animacion}
              style={{ height: "600px", width: "800px" }}
              alt="Animacion gif"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaginaUno;
