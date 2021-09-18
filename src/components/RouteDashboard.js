import React from "react";
import { Route, Switch } from "react-router-dom";
import Contacto from "./Contacto";
import NotFound from "./NotFound";
import NuevaPregunta from "./NuevaPregunta";
import Administradores from "./Administradores";
import AgregarAdministrador from "./AgregarAdministrador";
import Cursos from "./Cursos";
import Preguntas from "./Preguntas";
import NewPassword from "./NewPassword";
import NuevoCurso from "./NuevoCurso";
import EditarPerfil from "./EditarPerfil";
import EliminarPerfil from "./EliminarPerfil";

const RouteDashboard = (props) => {
  return (
    <Switch>
      <Route path={"/dashboard/eliminar-perfil"} exact>
        <EliminarPerfil
          setToken={props.setToken}
          setUser={props.setUser}
          user={props.user}
          token={props.token}
        />
      </Route>
      <Route path={"/dashboard/editar-perfil"} exact>
        <EditarPerfil
          setToken={props.setToken}
          setUser={props.setUser}
          user={props.user}
          token={props.token}
        />
      </Route>
      <Route path={"/dashboard/nuevo-curso"} exact>
        <NuevoCurso
          setToken={props.setToken}
          setUser={props.setUser}
          user={props.user}
          token={props.token}
        />
      </Route>
      <Route path={"/dashboard/cursos"} exact>
        <Cursos
          setToken={props.setToken}
          setUser={props.setUser}
          user={props.user}
          token={props.token}
        />
      </Route>
      <Route path={"/dashboard/contacto"} exact>
        <Contacto
          setToken={props.setToken}
          setUser={props.setUser}
          user={props.user}
          token={props.token}
        />
      </Route>
      <Route path={"/dashboard/nueva-pregunta"} exact>
        <NuevaPregunta
          user={props.user}
          token={props.token}
          editar={props.editar}
          setEditar={props.setEditar}
        />
      </Route>
      <Route path={"/dashboard/cambiar-contrasena"} exact>
        <NewPassword
          setToken={props.setToken}
          setUser={props.setUser}
          user={props.user}
          token={props.token}
        />
      </Route>
      <Route path={"/dashboard/agregar-administrador"} exact>
        <AgregarAdministrador
          setToken={props.setToken}
          setUser={props.setUser}
          user={props.user}
          token={props.token}
        />
      </Route>
      <Route path={"/dashboard/editar/pregunta"} exact>
        <NuevaPregunta
          setToken={props.setToken}
          setUser={props.setUser}
          user={props.user}
          token={props.token}
          editar={props.editar}
          setEditar={props.setEditar}
        />
      </Route>
      <Route path={"/dashboard/administradores"} exact>
        <Administradores
          setToken={props.setToken}
          setUser={props.setUser}
          user={props.user}
          token={props.token}
        />
      </Route>
      <Route path={"/dashboard/preguntas"} exact>
        <Preguntas
          editar={props.editar}
          setEditar={props.setEditar}
          setToken={props.setToken}
          setUser={props.setUser}
          user={props.user}
          token={props.token}
        />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
};

export default RouteDashboard;
