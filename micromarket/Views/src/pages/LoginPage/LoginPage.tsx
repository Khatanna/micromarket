import { Button, Stack, TextField, Typography } from "@mui/material";

const LoginPage = () => {
  return (
    <form className="mx-auto w-3/12 min-h-screen max-h-screen flex items-center">
      <Stack width={"100%"} spacing={3}>
        <Typography variant="h5" component={"h1"} align="center">
          Micromarket doña Natty
        </Typography>
        <Stack spacing={2} width={"100%"}>
          <TextField label="Nombre de usuario" variant="outlined"></TextField>
          <TextField label="Contraseña" variant="outlined"></TextField>
          <Button variant="contained">Iniciar sesión</Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default LoginPage;
