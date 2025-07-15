import "./App.css";
import React from "react";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TodosContext from "./contexts/TodosContext";

function App() {
  const [todoslist, setTodoslist] = React.useState([]);
  const theme = createTheme({
    typography: {
      fontFamily: "Alex",
    },
    palette: {
      primary: {
        main: "#1976d2",
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TodosContext.Provider value={{ todoslist, setTodoslist }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
