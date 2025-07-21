import "./App.css";
import React from "react";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosProvider } from "./contexts/TodosContext";
import { SnakeProvider } from "./contexts/SnakeContext";
import SnackBar from "./components/SnakeBar";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Alex",
    },
    palette: {
      primary: {
        main: "#1976d2",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TodosProvider>
          <SnakeProvider>
            <TodoList />
            <SnackBar />
          </SnakeProvider>
        </TodosProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
