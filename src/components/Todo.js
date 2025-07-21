// MUI Components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

// MUI Icons
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";

// Contexts
import { useSnake } from "../contexts/SnakeContext";
import { useDispatch } from "../contexts/TodosContext";

export default function Todo({ todo, handleClickOpen, handleOpen }) {
  // Contexts
  const { setOpenSnake, setSnakeContent } = useSnake();
  const dispatch = useDispatch();

  // Toggle completion status
  const handlecompleted = () => {
    dispatch({
      type: "complete",
      payload: {
        id: todo.id,
      },
    });
    setOpenSnake(true);

    todo.completed === true
      ? setSnakeContent("تم التحديد كغير منجز بنجاح")
      : setSnakeContent("تم التحديد كمنجز بنجاح");
  };

  return (
    <Card
      className="todocard"
      sx={{ background: "#252f88", color: "white", margin: 2 }}
    >
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Action Buttons */}
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={handleOpen}
                className="iconButton"
                sx={{
                  color: "red",
                  backgroundColor: "white",
                  border: "2px solid red",
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
              <IconButton
                onClick={handleClickOpen}
                className="iconButton"
                sx={{
                  color: "#346592",
                  backgroundColor: "white",
                  border: "2px solid #346592",
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={handlecompleted}
                className="iconButton"
                sx={{
                  color: "green",
                  backgroundColor: todo.completed ? "lightgreen" : "white",
                  border: "2px solid green",
                }}
              >
                <DoneIcon />
              </IconButton>
            </Stack>

            {/* Task Info */}
            <Typography
              variant="h6"
              component="div"
              sx={{ direction: "rtl", textAlign: "right", flex: 1 }}
            >
              {todo.title}
              <br />
              {todo.description}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
