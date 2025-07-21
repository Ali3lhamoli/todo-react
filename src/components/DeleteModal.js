import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { useSnake } from "../contexts/SnakeContext";
import { useDispatch } from "../contexts/TodosContext";

export default function DeleteModal({ open, handleClose, todo }) {
  const { setOpenSnake, setSnakeContent } = useSnake();
  const dispatch = useDispatch();

  return (
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
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          هل انت متأكد من حذف هذه المهمة؟
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          لا يمكن التراجع عن هذا الإجراء!
        </Typography>
        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
          <IconButton
            onClick={() => {
              dispatch({
                type: "delete",
                payload: {
                  id: todo.id,
                },
              });
              handleClose();
              setOpenSnake(true);
              setSnakeContent("تم الحذف بنجاح");
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
  );
}
