import React, { useState } from "react";
import { Button, Tooltip } from "antd";
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
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import "../assets/css/ova.css";
import { useHistory } from "react-router-dom";
import api from "../assets/js/api";
import Cargando from "./Cargando";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PaginaUno = (props) => {
  const history = useHistory();
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(true);
  const [termino, setTermino] = useState(false);
  const [comenzo, setComenzo] = useState(false);
  const [caticatura, setCaricatura] = useState(false);
  const pause = () => {
    setPaused(!paused);
  };

  const reiniciar = () => {
    const container = document.getElementById("vid");
    let video = container.querySelector("video");
    video.currentTime = 0;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="contenedor">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "16.6% 16.6% 16.6% 16.6% 16.6% 16.6%",
            width: "270px",
            position: "absolute",
            top: "10px",
            left: "530px",
            zIndex: 1000,
          }}
        >
          <Tooltip
            title="Retroceder"
            onClick={() => {
              props.restarProgreso();
              history.replace("uno");
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
              props.sumarProgreso();
            }}
          >
            <Button
              disabled={!termino}
              shape="circle"
              size="large"
              icon={<FastForwardOutlined />}
            />
          </Tooltip>

          <Tooltip title="Inicio" onClick={() => history.replace("uno")}>
            <Button shape="circle" size="large" icon={<HomeOutlined />} />
          </Tooltip>

          <Tooltip
            title="Volver a reproducir"
            onClick={() => {
              reiniciar();
              setTermino(false);
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
        {termino && (
          <FontAwesomeIcon
            icon={faPlayCircle}
            style={{
              fontSize: "150px",
              position: "absolute",
              margin: 0,
              zIndex: 100,
              top: 150,
              left: 150,
              color: "#ff1780",
              cursor: "pointer",
              cursor: "hand",
            }}
            onClick={() => console.log("aaa")}
          />
        )}
        <div className="player">
          {!comenzo && <Cargando />}
          <ReactPlayer
            id="vid"
            url={`${api}recursos/enviar-video/ova_dos.mp4`}
            onPlay={() => {
              setComenzo(true);
            }}
            width="800px"
            height="600px"
            playing={paused}
            autoPlay
            muted={muted}
            onProgress={({ playedSeconds: seconds }) =>
              seconds >= 5 && setTermino(true)
            }
            loop
          />
        </div>
      </div>
    </div>
  );
};
export default PaginaUno;
