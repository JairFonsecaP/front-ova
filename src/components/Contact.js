import React from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import MailOutlineRoundedIcon from "@material-ui/icons/MailOutlineRounded";

import "../assets/css/formulario.css";

const Contact = () => {
  return (
    <Grid>
      <Paper elevation={20} className="paper">
        <Grid align="center">
          <Avatar className="avatar">
            <MailOutlineRoundedIcon />
          </Avatar>
          <h2 className="titulo-form">Contactanos</h2>
          <Typography variant="caption">
            Llena este formulario y nos pondremos en contacto contigo a la
            brevedd
          </Typography>
        </Grid>
        <form>
          <TextField fullWidth label="Name" placeholder="Ingresa tu nombre" />
          <TextField
            fullWidth
            label="Email"
            placeholder="Ingresa un e-mail valido"
          />
          <TextField fullWidth label="Telefono" placeholder="Te llamaremos" />
          <TextField fullWidth label="Comentario" />
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Contact;
