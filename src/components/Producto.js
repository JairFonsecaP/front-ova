import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

function Producto() {
  return (
    <Grid>
      <Paper
        elevation={20}
        style={{
          maxWidth: "500px",
          margin: "50px auto",
          padding: "20px",
        }}
      >
        <Grid align="center">
          <h2 className="titulo-form">Quienes somos</h2>
        </Grid>
        <Typography variant="caption" style={{ fontSize: "20px" }}>
          Nuestra plataforma “El aula del maestro” es una página web en la cual
          interactúan docentes, estudiantes y padres de familia de forma
          amigable, los procesos educativos se desarrollan por medio de los
          juegos, con fin de captar el interés de los estudiantes y afianzar los
          conocimientos adquiridos, los cuales se verán reflejados en su
          promedio académico, de esta forma padres y docentes pueden realizar
          seguimiento a los avances manteniendo contacto directo.
        </Typography>
      </Paper>
    </Grid>
  );
}
export default Producto;
