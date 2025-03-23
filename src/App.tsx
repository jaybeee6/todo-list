import { Modals } from "./components/modals/modals";
import { Authentication } from "./screens";
import supabase from "./config/supabaseClient";
import { useEffect } from "react";
import { useToDosStore } from "./store";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e4d5b7",
    },
    secondary: {
      main: "#38761d",
    },
  },
  typography: {
    fontFamily: '"Quicksand", sans-serif;',
  },
});

function App() {
  const setToDosPersisted = useToDosStore((state) => state.setToDosPersisted);
  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await supabase.from("todos").select();

      if (data) {
        setToDosPersisted(data);
      }
    };

    fetchTodos();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Modals />
      <Authentication />
    </ThemeProvider>
  );
}

export default App;
