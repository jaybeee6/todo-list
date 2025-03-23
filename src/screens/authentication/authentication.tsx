import { Button, Container, TextField, Typography } from "@mui/material";
import { useAuthenticationHelper } from "./authentication.helper";

export const Authentication = () => {
  const { handleOnChangeName, handleViewToDoList, name } =
    useAuthenticationHelper();
  return (
    <Container
      sx={{
        textAlign: "center",
        gap: "24px",
        display: "flex",
        flexDirection: "column",
        p: 4,
        alignItems: "center",
      }}
    >
      <Typography
        fontSize={"24px"}
        children={"Bem Vindo! Insira o seu nome para gerir as suas tarefas!"}
      />

      <TextField
        label={"Digite seu nome"}
        variant={"outlined"}
        slotProps={{ htmlInput: { color: "secondary" } }}
        value={name}
        color={"primary"}
        onChange={(e) => handleOnChangeName(e.target.value)}
        style={{ marginBottom: "20px", width: "300px" }}
      />

      <Button
        variant={"contained"}
        color={"secondary"}
        disabled={!name.trim()}
        onClick={handleViewToDoList}
        sx={{ borderRadius: "24px" }}
      >
        <Typography fontSize={"18px"} children={" Visualizar Tarefas"} />
      </Button>
    </Container>
  );
};

export default Authentication;
