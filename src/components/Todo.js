import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import TodosContext from "../contexts/TodosContext";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function Todo({ todo }) {
  const { todoslist, setTodoslist } = useContext(TodosContext);
  const handlecompleted = () => {
    const updatedTodos = todoslist.map((todoo) => {
      if (todoo.id === todo.id) {
        return { ...todoo, completed: !todoo.completed };
      }
      return todoo;
    });
    setTodoslist(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [opene, setOpene] = React.useState(false);

  const handleClickOpen = () => {
    setOpene(true);
  };

  const handleClosee = () => {
    setOpene(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const title = formJson.title;
    const description = formJson.description;
    const updatedTodos = todoslist.map((todoo) => {
      if (todoo.id === todo.id) {
        return { ...todoo, title: title, description: description };
      }
      return todoo;
    });
    setTodoslist(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    handleClosee();
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
              <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    direction: "rtl",
                  }}
                >
                  <Typography
                    id="keep-mounted-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    هل انت متأكد من حذف هذه المهمة؟
                  </Typography>
                  <Typography
                    id="keep-mounted-modal-description"
                    sx={{ mt: 2 }}
                  >
                    لا يمكن التراجع عن هذا الإجراء!
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    sx={{ mt: 2 }}
                  >
                    <IconButton
                      onClick={() => {
                        const updatedTodos = todoslist.filter(
                          (todoo) => todoo.id !== todo.id
                        );
                        setTodoslist(updatedTodos);
                        localStorage.setItem(
                          "todos",
                          JSON.stringify(updatedTodos)
                        );
                        handleClose();
                      }}
                      sx={{
                        color: "#901537",
                        borderRadius: 1,
                        "&:hover": {
                          backgroundColor: "#901537",
                          color: "white",
                        },
                      }}
                    >
                      نعم قم بالحذف
                    </IconButton>
                    <IconButton
                      onClick={handleClose}
                      sx={{
                        color: "#901537",
                        borderRadius: 1,
                        "&:hover": {
                          backgroundColor: "#901537",
                          color: "white",
                        },
                      }}
                    >
                      اغلاق
                    </IconButton>
                  </Stack>
                </Box>
              </Modal>
              <Dialog
                style={{ direction: "rtl" }}
                open={opene}
                onClose={handleClosee}
              >
                <DialogTitle>تعديل المهمة</DialogTitle>
                <DialogContent sx={{ paddingBottom: 0 }}>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="title"
                      name="title"
                      label="عنوان المهمة"
                      type="text"
                      fullWidth
                      variant="standard"
                      defaultValue={todo.title}
                    />
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="description"
                      name="description"
                      label="وصف المهمة"
                      type="text"
                      fullWidth
                      variant="standard"
                      defaultValue={todo.description}
                    />
                    <DialogActions>
                      <Button onClick={handleClosee}>الغاء</Button>
                      <Button type="submit">تعديل</Button>
                    </DialogActions>
                  </form>
                </DialogContent>
              </Dialog>
            </Stack>

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
