// generate a react component to pass the tests in App.test.tsx

import React from "react";
import ModalCreateTask from "./components/Utilities/ModalTask";
import TasksSection from "./components/TasksSection/TasksSection";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { modalActions, modalSelectors } from "./store/Modal.store";
import { Task } from "./interfaces";
import { tasksActions } from "./store/Tasks.store";

const App = () => {
  const modalCreateTaskOpen = useAppSelector(modalSelectors.modalCreateTaskOpen);
  const dispatch = useAppDispatch();

  const closeModalCreateTask = () => {
    dispatch(modalActions.closeModalCreateTask());
  };

  const createTask = (task: Task) => {
    dispatch(tasksActions.addNewTask(task));
  };

  return (
    <>
      <TasksSection />
      {modalCreateTaskOpen && <ModalCreateTask onClose={closeModalCreateTask} onConfirm={createTask} nameForm="Add task"/>}
    </>
  );
}

export default App;