import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LogoutIcon from "@mui/icons-material/Logout";
import api from "../assets/js/api";

import "../assets/css/header.css";

function Header(props) {
  const history = useHistory();
  return (
    <div className="header-completo">
      <div className="logo">
        <Link to="/">
          <img
            className="logo"
            src={`${api}recursos/enviar-picture/logo.png`}
            alt="Logo diseñado en blender"
          />
        </Link>
      </div>
      <div className="sub-header">
        <h1>OVA "EL AULA DEL MAESTRO"</h1>
        <div className="links">
          <Link to="/" className="link-header">
            Inicio
          </Link>
          <Link to="/contacto" className="link-header">
            Contactanos
          </Link>

          <Link to="/nosotros" className="link-header">
            ¿Quienes somos?
          </Link>

          <Link to="/producto" className="link-header">
            Nuestro producto
          </Link>
          <div>
            {props.user ? (
              <Button
                size="medium"
                variant="contained"
                color="primary"
                startIcon={<LogoutIcon />}
                onClick={() => {
                  props.setUser(undefined);
                  props.setToken(undefined);
                  sessionStorage.removeItem("token");
                }}
              >
                Cerrar sesión
              </Button>
            ) : (
              <Button
                size="medium"
                variant="contained"
                color="primary"
                startIcon={<VpnKeyIcon />}
                onClick={() => history.push("/login")}
              >
                Administradores
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
