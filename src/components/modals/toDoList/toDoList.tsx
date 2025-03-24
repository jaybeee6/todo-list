import { AddTask, CheckCircle, Delete, Edit, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ToDoStatus } from "../../../types/types";
import { useToDoListModalHelper } from "./toDoList.helper";

export const ToDoListModal = () => {
  const {
    editedBeginDateToDo,
    editedDescriptionToDo,
    filter,
    filteredTodos,
    handleDeleteToDo,
    handleToDoEdition,
    handleUpdateToDo,
    hide,
    isVisibleModal,
    handleCompleteToDo,
    setEditedBeginDateToDo,
    setEditedDescriptionToDo,
    setFilter,
    showAddToDo,
    editingIndex,
    username,
    handleDateFormat,
  } = useToDoListModalHelper();

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
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="secondary">
          {`${username} aqui pode encontrar os seus To Dos`}
        </Typography>

        <Divider />

        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel color="secondary">
              <Typography
                fontSize={"16px"}
                fontWeight={"bold"}
                children={"Filtrar tarefas"}
              />
            </InputLabel>
            <Select
              color="secondary"
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as "all" | "pending" | "completed")
              }
            >
              <MenuItem value="all">
                <Typography
                  fontSize={"16px"}
                  fontWeight={"bold"}
                  children={"Todas"}
                />
              </MenuItem>
              <MenuItem value="pending">
                <Typography
                  fontSize={"16px"}
                  fontWeight={"bold"}
                  children={"Activas"}
                />
              </MenuItem>
              <MenuItem value="completed">
                <Typography
                  fontSize={"16px"}
                  fontWeight={"bold"}
                  children={"Concluídas"}
                />
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Paper
          elevation={3}
          sx={{
            height: "fit-content",
            overflowY: "auto",
            borderRadius: 2,
            bgcolor: "beige",
            p: 1,
          }}
        >
          <List>
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo, index) => (
                <ListItem
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    bgcolor:
                      todo.status === ToDoStatus.FINISHED
                        ? "#daffdd"
                        : "#FAFAD2",
                    borderRadius: "16px",
                    mb: 1,
                    p: 3,
                    border: "1px solid #C3CAD4",
                  }}
                >
                  {editingIndex === index ? (
                    <>
                      <Stack
                        direction={{ xs: "column", sm: "column", md: "row" }}
                        gap={{ xs: "8px", sm: "8px", md: "12px" }}
                        width={"100%"}
                      >
                        <TextField
                          value={editedDescriptionToDo}
                          onChange={(e) =>
                            setEditedDescriptionToDo(e.target.value)
                          }
                          sx={{ flex: 1, mr: 1 }}
                          slotProps={{ htmlInput: { maxLength: 100 } }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            value={new Date(editedBeginDateToDo)}
                            onChange={(newValue) =>
                              setEditedBeginDateToDo(
                                newValue?.toDateString() ||
                                  new Date().toDateString()
                              )
                            }
                          />
                        </LocalizationProvider>
                      </Stack>
                      <IconButton
                        onClick={() => handleUpdateToDo(todo.id || "")}
                        color="success"
                        disabled={
                          editingIndex === index &&
                          !editedDescriptionToDo.trim()
                        }
                      >
                        <Save />
                      </IconButton>
                    </>
                  ) : (
                    <Stack
                      direction={"column"}
                      sx={{
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box>
                            <Stack
                              direction={"row"}
                              sx={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                fontSize={"18px"}
                                fontWeight={"bold"}
                                children={todo.description}
                              />
                              <Chip
                                icon={
                                  todo.status === ToDoStatus.FINISHED ? (
                                    <CheckCircle />
                                  ) : undefined
                                }
                                label={todo.status}
                                color={
                                  todo.status === ToDoStatus.FINISHED
                                    ? "primary"
                                    : "secondary"
                                }
                              />
                            </Stack>
                          </Box>
                        }
                      />
                      <Box>
                        <Stack
                          direction={"column"}
                          sx={{
                            display: "flex",
                            width: "100%",
                            gap: 1,
                          }}
                        >
                          <Typography
                            fontSize={"16px"}
                            color="secondary"
                            fontWeight={"medium"}
                            children={`Início: ${handleDateFormat(
                              todo.beginDate
                            )}`}
                          />
                          {todo.status === ToDoStatus.FINISHED && (
                            <Typography
                              color="secondary"
                              fontSize={"16px"}
                              fontWeight={"medium"}
                              children={`To Do concluído em: ${handleDateFormat(
                                todo.endDate || ""
                              )}`}
                            />
                          )}
                        </Stack>
                      </Box>
                      <Stack direction={"row"} justifyContent={"right"}>
                        <IconButton
                          onClick={() => {
                            handleCompleteToDo(todo.id || "");
                          }}
                          color="success"
                          disabled={
                            new Date(todo.beginDate) > new Date() ||
                            todo.status === ToDoStatus.FINISHED
                          }
                        >
                          <CheckCircle />
                        </IconButton>
                        <IconButton
                          onClick={() => handleToDoEdition(index)}
                          color="secondary"
                          disabled={todo.status === ToDoStatus.FINISHED}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            handleDeleteToDo(todo.id || "");
                          }}
                        >
                          <Delete />
                        </IconButton>
                        {/* <Button
                          variant="outlined"
                          color="secondary"
                          sx={{
                            justifyContent: "end",
                            borderRadius: "16px",
                            border: "1px solid secondary",
                          }}
                          children={"Mais info"}
                          endIcon={<ArrowRight />}
                        /> */}
                      </Stack>
                    </Stack>
                  )}
                </ListItem>
              ))
            ) : (
              <Typography
                color="secondary"
                align="center"
                sx={{ p: 2 }}
                children={"Nenhuma tarefa adicionada."}
              />
            )}
          </List>
        </Paper>
        <Stack direction={{ xs: "column", sm: "column", md: "row" }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              mt: 2,
              width: { xs: "30%", sm: "30%", md: "15%" },
              py: 1.2,
              fontWeight: "bold",
              borderRadius: "10px",
              alignSelf: "center",
            }}
            onClick={hide}
          >
            <Typography color="primary" align="center" children={"Fechar"} />
          </Button>
          <Stack
            sx={{
              justifyContent: "end",
              width: "100%",
              alignItems: { xs: "center", sm: "center", md: "end" },
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                hide();
                showAddToDo();
              }}
              sx={{
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "10px",
                display: "flex",
                gap: 1,
                marginTop: "12px",
              }}
            >
              <AddTask color="primary" />
              <Typography color="primary" children={"Adicionar novo To Do"} />
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};
