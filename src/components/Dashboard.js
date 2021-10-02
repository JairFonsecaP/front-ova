import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  ProfileOutlined,
  ContactsOutlined,
  LogoutOutlined,
  ApartmentOutlined,
  QuestionOutlined,
  UsergroupAddOutlined,
  TableOutlined,
  HomeFilled,
} from "@ant-design/icons";
import RouteDashboard from "./RouteDashboard";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = (props) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const [editar, setEditar] = useState(undefined);
  const onCollapse = (collapsed) => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => onCollapse(collapsed)}
      >
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item
            key="14"
            icon={<HomeFilled />}
            onClick={() => history.push("/")}
          >
            Inicio
          </Menu.Item>
          <Menu.Item
            key="1"
            icon={<ContactsOutlined />}
            onClick={() => history.push("/dashboard/contacto")}
          >
            Interesados
          </Menu.Item>
          <Menu.Item
            key="101"
            icon={<TableOutlined />}
            onClick={() => history.push("/dashboard/resultados")}
          >
            Resultados
          </Menu.Item>
          <SubMenu key="sub1" icon={<QuestionOutlined />} title="Preguntas">
            <Menu.Item
              key="3"
              onClick={() => {
                setEditar(undefined);
                history.push("/dashboard/nueva-pregunta");
              }}
            >
              Nueva Pregunta
            </Menu.Item>
            <Menu.Item
              key="4"
              onClick={() => history.push("/dashboard/preguntas")}
            >
              Lista de Preguntas
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<UsergroupAddOutlined />} title="Cursos">
            <Menu.Item
              key="12"
              onClick={() => {
                history.push("/dashboard/nuevo-curso");
              }}
            >
              Agregar cursos
            </Menu.Item>
            <Menu.Item
              key="11"
              onClick={() => {
                history.push("/dashboard/cursos");
              }}
            >
              Lista de cursos
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<ApartmentOutlined />} title="Equipo">
            <Menu.Item
              key="6"
              onClick={() => history.push("/dashboard/administradores")}
            >
              Administradores
            </Menu.Item>
            <Menu.Item
              key="8"
              onClick={() => history.push("/dashboard/agregar-administrador")}
            >
              Agregar administrador
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" icon={<ProfileOutlined />} title="Mi perfil">
            <Menu.Item
              key="18"
              onClick={() => {
                history.push("/dashboard/editar-perfil");
              }}
            >
              Editar perfil
            </Menu.Item>
            <Menu.Item
              key="5"
              onClick={() => {
                history.push("/dashboard/cambiar-contrasena");
              }}
            >
              Cambiar Contraseña
            </Menu.Item>
            <Menu.Item
              key="19"
              onClick={() => {
                history.push("/dashboard/eliminar-perfil");
              }}
            >
              Eliminar perfil
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key="9"
            icon={<LogoutOutlined />}
            onClick={() => {
              props.setUser(undefined);
              props.setToken(undefined);
              sessionStorage.removeItem("token");
              history.push("/login");
            }}
          >
            Cerrar sesión
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, color: "#fff", textAlign: "center" }}
        >
          Bienvenido {props.user.nombre}
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <RouteDashboard
            editar={editar}
            setEditar={setEditar}
            setToken={props.setToken}
            setUser={props.setUser}
            user={props.user}
            token={props.token}
          />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Creado por TravelMedia en 2021©
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
