import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnake } from "../contexts/SnakeContext";
import { useDispatch } from "../contexts/TodosContext";

export default function EditDialog({ handleClosee, opene, todo }) {
  const { setOpenSnake, setSnakeContent } = useSnake();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "edit",
      payload: {
        id: todo.id,
        currentTarget: event.currentTarget,
      },
    });
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
