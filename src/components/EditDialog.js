import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import TodosContext from "../contexts/TodosContext";
import { useSnake } from "../contexts/SnakeContext";

export default function EditDialog({ handleClosee, opene, todo }) {
  const { todoslist, setTodoslist } = useContext(TodosContext);

  const { setOpenSnake, setSnakeContent } = useSnake();

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
    setOpenSnake(true);
    setSnakeContent("تم التعديل بنجاح");
  };

  return (
    <Dialog style={{ direction: "rtl" }} open={opene} onClose={handleClosee}>
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
  );
}
