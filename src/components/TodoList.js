// MUI Components
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

// Custom Components
import Todo from "./Todo";
import EditDialog from "./EditDialog";
import DeleteModal from "./DeleteModal";

// Utilities & Context
import { useEffect, useMemo, useState } from "react";
import { useTodoslist, useDispatch } from "../contexts/TodosContext";
import { useSnake } from "../contexts/SnakeContext";

export default function TodoList() {
  // Filter toggle state
  const [alignment, setAlignment] = useState("all");

  // Todo input value state
  const [inputvalue, setInputValue] = useState("");

  // Contexts
  const todoslist = useTodoslist();
  const dispatch = useDispatch();
  const { setOpenSnake, setSnakeContent } = useSnake();

  // Edit dialog state
  const [opene, setOpene] = useState(false);

  // Delete modal state
  const [open, setOpen] = useState(false);

  // Selected todo state
  const [selectedTodo, setSelectedTodo] = useState({});

  // Load todos from localStorage
  useEffect(() => {
    dispatch({ type: "render" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handlers for toggle filter
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // Handler for adding new task
  const handleAddTask = () => {
    if (inputvalue.trim() !== "") {
      dispatch({
        type: "add",
        payload: {
          inputvalue: inputvalue,
        },
      });
      setInputValue("");
      setOpenSnake(true);
      setSnakeContent("تمت الاضافة بنجاح");
    }
  };

  // Handlers for Edit Dialog
  const handleClickOpen = (todo) => {
    setSelectedTodo(todo);
    setOpene(true);
  };
  const handleClosee = () => {
    setOpene(false);
  };

  // Handlers for Delete Modal
  const handleOpen = (todo) => {
    setOpen(true);
    setSelectedTodo(todo);
  };
  const handleClose = () => setOpen(false);

  // Filtering todos based on completion status
  const completedTodos = useMemo(() => {
    return todoslist.filter((todo) => todo.completed === true);
  }, [todoslist]);

  const notCompletedTodos = useMemo(() => {
    return todoslist.filter((todo) => todo.completed === false);
  }, [todoslist]);

  let newTodos = todoslist;
  if (alignment === "nodone") {
    newTodos = notCompletedTodos;
  } else if (alignment === "done") {
    newTodos = completedTodos;
  }

  const todoslistshow = newTodos.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        handleClickOpen={() => handleClickOpen(todo)}
        handleOpen={() => handleOpen(todo)}
      />
    );
  });

  return (
    <>
      <EditDialog
        opene={opene}
        handleClosee={handleClosee}
        todo={selectedTodo}
      />
      <DeleteModal open={open} handleClose={handleClose} todo={selectedTodo} />
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
    </>
  );
}
