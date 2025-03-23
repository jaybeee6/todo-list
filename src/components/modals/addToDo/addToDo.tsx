import {
  Box,
  Button,
  Divider,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useModal } from "../../../hooks";
import { AddTask, ArrowBack } from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";
import { v4 as guid } from "uuid";
import { ToDoStatus } from "../../../types/types";
import { useToDosStore, useUserInfoStore } from "../../../store";
import supabase from "../../../config/supabaseClient";

export const AddToDoModal = () => {
  const { hide, isVisibleModal } = useModal("addToDo");
  const { show: showToDoList } = useModal("toDoList");

  const [descriptionToDo, setDescriptionToDo] = useState<string>("");
  const [beginDateToDo, setBeginDateToDo] = useState<string>(
    new Date().toDateString()
  );
  const username = useUserInfoStore((state) => state.name);
  const setNewToDo = useToDosStore((state) => state.setNewToDo);

  const handleOnClickBack = () => {
    setDescriptionToDo("");
    setBeginDateToDo(new Date().toDateString());
    hide();
    showToDoList();
  };

  const handleSubmitNewToDo = async () => {
    setDescriptionToDo("");
    setBeginDateToDo(new Date().toDateString());
    const uid = guid();
    setNewToDo({
      id: uid,
      autor: username,
      beginDate: new Date(beginDateToDo).toString(),
      status: ToDoStatus.ONGOING,
      description: descriptionToDo,
    });
    await supabase
      .from("todos")
      .insert([
        {
          id: uid,
          autor: username,
          beginDate: new Date(beginDateToDo),
          status: ToDoStatus.ONGOING,
          description: descriptionToDo,
        },
      ])
      .then(() => {
        hide();
        showToDoList();
      });
  };

  return (
    <Modal open={isVisibleModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "73%", sm: "73%", md: "50%" },
          bgcolor: "beige",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxHeight: "90%",
          minHeight: "40%",
        }}
      >
        <TextField
          label="Nova Tarefa"
          variant="outlined"
          placeholder="Insira a sua tarefa..."
          color="secondary"
          fullWidth
          required
          multiline
          value={descriptionToDo}
          onChange={(e) => setDescriptionToDo(e.target.value)}
          slotProps={{
            htmlInput: { maxLength: 100 },
            inputLabel: { shrink: true, required: true },
          }}
        />

        <Divider />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Data"
            value={new Date(beginDateToDo)}
            onChange={(newValue) =>
              setBeginDateToDo(
                newValue?.toDateString() || new Date().toDateString()
              )
            }
            slotProps={{ inputAdornment: { color: "secondary" } }}
          />
        </LocalizationProvider>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          gap={{ xs: "8px", sm: "8px", md: "12px" }}
          sx={{
            width: "100%",
            position: "absolute",
            bottom: "32px",
            left: 0,
            justifyContent: "space-between",
          }}
        >
          <Button
            id="back"
            variant="contained"
            color="secondary"
            onClick={() => {
              handleOnClickBack();
            }}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: { xs: "50%", sm: "50%", md: "30%" },
              alignSelf: { xs: "center", sm: "center", md: "start" },
              marginLeft: { xs: undefined, sm: undefined, md: "32px" },
            }}
          >
            <ArrowBack color={"primary"} />
            <Typography color={"primary"} children={"Voltar"} />
          </Button>
          <Button
            id="add"
            variant="contained"
            color="secondary"
            disabled={!descriptionToDo.trim()}
            onClick={() => {
              handleSubmitNewToDo();
            }}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: { xs: "50%", sm: "50%", md: "30%" },
              alignSelf: { xs: "center", sm: "center", md: "end" },
              marginRight: { xs: undefined, sm: undefined, md: "32px" },
            }}
          >
            <AddTask color={!descriptionToDo.trim() ? "disabled" : "primary"} />
            <Typography
              color={!descriptionToDo.trim() ? "disabled" : "primary"}
              children={"Adicionar"}
            />
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
