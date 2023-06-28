import {
  Action,
  createSlice,
  Dispatch,
  MiddlewareAPI,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Task } from "../interfaces";

const initialState: {
  tasks: Task[];
} = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    addNewTask(state, action: PayloadAction<Task>) {
      state.tasks = [action.payload, ...state.tasks];
    },
    removeTask(state, action) {
      const newTasksList = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      state.tasks = newTasksList;
    },
    markAsImportant(state, action: PayloadAction<string>) {
      const newTaskFavorited = state.tasks.find(
        (task) => task.id === action.payload
      );
      newTaskFavorited!.important = !newTaskFavorited!.important;
    },
    editTask(state, action: PayloadAction<Task>) {
      const taskId = action.payload.id;

      const newTaskEdited: Task = state.tasks.find(
        (task: Task) => task.id === taskId
      )!;
      const indexTask = state.tasks.indexOf(newTaskEdited);
      state.tasks[indexTask] = action.payload;
    },
    toggleTaskCompleted(state, action: PayloadAction<string>) {
      const taskId = action.payload;

      const currTask = state.tasks.find((task) => task.id === taskId)!;

      currTask.completed = !currTask.completed;
    },
    deleteAllData(state) {
      state.tasks = [];
    },

  
  },
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;

export const tasksMiddleware =
  (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    const nextAction = next(action);

    const isADirectoryAction: boolean = action.type
      .toLowerCase()
      .includes("directory");

    if (action.type.startsWith("tasks/")) {
      const tasksList = store.getState().tasks.tasks;
      localStorage.setItem("tasks", JSON.stringify(tasksList));
    }
    if (action.type.startsWith("tasks/") && isADirectoryAction) {
      const dirList = store.getState().tasks.directories;
      localStorage.setItem("directories", JSON.stringify(dirList));
    }

    if (tasksActions.deleteAllData.match(action)) {
      localStorage.removeItem("tasks");
      localStorage.removeItem("directories");
      localStorage.removeItem("darkmode");
    }

    if (tasksActions.removeTask.match(action)) {
      console.log(JSON.parse(localStorage.getItem("tasks")!));
      if (localStorage.getItem("tasks")) {
        const localStorageTasks = JSON.parse(localStorage.getItem("tasks")!);
        if (localStorageTasks.length === 0) {
          localStorage.removeItem("tasks");
        }
      }
    }
    return nextAction;
  };
