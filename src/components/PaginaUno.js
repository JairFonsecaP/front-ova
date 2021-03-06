import React, { useEffect, useState } from "react";
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
  PlayCircleOutlined,
} from "@ant-design/icons";
import ReactPlayer from "react-player";
import "../assets/css/ova.css";
import { useHistory } from "react-router-dom";
import Cargando from "./Cargando";
import api from "../assets/js/api";

const PaginaUno = (props) => {
  const history = useHistory();
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(true);
  const [termino, setTermino] = useState(false);
  const [comenzo, setComenzo] = useState(false);

  const pause = () => {
    setPaused(!paused);
  };

  const reiniciar = () => {
    const container = document.getElementById("vid");
    let video = container.querySelector("video");
    video.currentTime = 0;
  };
  useEffect(() => {
    props.setProgreso(25);
  }, []);
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
          <Tooltip title="Retroceder">
            <Button
              key="paginauno"
              disabled
              shape="circle"
              size="large"
              icon={<FastBackwardOutlined />}
            />
          </Tooltip>
          <Tooltip
            title="Avanzar"
            onClick={() => {
              props.sumarProgreso();
              history.replace("dos");
            }}
          >
            <Button
              disabled={!termino}
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
              setTermino(false);
            }}
          >
            <Button shape="circle" size="large" icon={<ReloadOutlined />} />
          </Tooltip>

          <Tooltip
            title={paused ? "Pausar" : "Reanudar"}
            id="pausar"
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
          <Tooltip title="Empezar">
            <Button
              size="large"
              icon={<PlayCircleOutlined />}
              type="primary"
              style={{
                position: "absolute",
                margin: 0,
                zIndex: 100,
                top: 500,
                left: 350,
              }}
              onClick={() => {
                props.sumarProgreso();
                return history.replace("dos");
              }}
            >
              PLAY
            </Button>
          </Tooltip>
        )}

        <div className="player">
          {!comenzo && <Cargando />}
          <ReactPlayer
            id="vid"
            url={`${api}recursos/enviar-video/ova_uno.mp4`}
            onPlay={() => {
              setComenzo(true);
            }}
            width="800px"
            height="600px"
            playing={paused}
            autoPlay
            muted={muted}
            onProgress={({ playedSeconds: seconds }) =>
              seconds >= 12 && setTermino(true)
            }
            loop
          />
        </div>
      </div>
    </div>
  );
};
export default PaginaUno;
