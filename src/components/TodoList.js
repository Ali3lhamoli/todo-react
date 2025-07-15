import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect } from "react";
import TodosContext from "../contexts/TodosContext";

export default function TodoList() {
  const [alignment, setAlignment] = React.useState("all");
  const { todoslist, setTodoslist } = useContext(TodosContext);
  const [inputvalue, setInputValue] = React.useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodoslist(JSON.parse(storedTodos));
    }
  }, []);
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleAddTask = () => {
    if (inputvalue.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        title: inputvalue,
        description: "",
        completed: false,
      };
      const updatedTodos = [...todoslist, newTodo];
      setTodoslist(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setInputValue("");
    }
  };

  let newTodos = todoslist;
  if (alignment === "nodone") {
    newTodos = todoslist.filter((todo) => todo.completed === false);
  } else if (alignment === "done") {
    newTodos = todoslist.filter((todo) => todo.completed === true);
  }
  const todoslistshow = newTodos.map((todo) => {
    return <Todo key={todo.id} todo={todo} />;
  });

  return (
    <Container maxWidth="sm">
      <Card
        style={{
          maxHeight: "80vh",
          overflowY: "auto",
        }}
        sx={{ minWidth: 275, direction: "ltr" }}
      >
        <CardContent>
          <Typography
            variant="h2"
            component="div"
            style={{ fontWeight: "700" }}
          >
            مهامى
          </Typography>
          <Divider sx={{ my: 2 }} />
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="nodone">غير منجز</ToggleButton>
            <ToggleButton value="done">منجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {todoslistshow && todoslistshow.length > 0 ? (
            todoslistshow
          ) : (
            <Typography
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                textAlign: "center",
                margin: "2rem",
                color: "#901537",
              }}
              variant="body1"
              color="textSecondary"
            >
              لا توجد مهام حالياً
            </Typography>
          )}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <TextField
              value={inputvalue}
              onChange={(e) => setInputValue(e.target.value)}
              id="outlined-basic"
              label="أضف مهمة جديدة"
              variant="outlined"
              fullWidth
            />
            <ToggleButton
              value="add"
              onClick={handleAddTask}
              sx={{
                height: 56,
                width: 200,
                color: "white",
                backgroundColor: "primary.main",
                "&:hover": { backgroundColor: "#2c4f7a" },
              }}
            >
              اضافة
            </ToggleButton>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
