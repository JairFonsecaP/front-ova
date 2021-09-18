import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
function Nosotros() {
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
          Somos una empresa joven, dedicada a la implementación de plataformas
          educativas interactivas, nuestro interés es permear el mercado
          educativo con un producto de alta calidad; el cual se ajusta a la
          necesidad del cliente, contamos con soporte técnico con tiempos real a
          fin de realizar los ajustar solicitado logrando la satisfacción en el
          servicio.
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Nosotros;
