import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import TasksSection from "./components/TasksSection/TasksSection";
import ModalCreateTask from "./components/Utilities/ModalTask";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { modalActions } from "./store/Modal.store";
import { tasksActions } from "./store/Tasks.store";
import App from "./App";
import { Task } from "./interfaces";

jest.mock("./store/hooks");
jest.mock("./store/Modal.store");
jest.mock("./store/Tasks.store");

describe("App", () => {
  let wrapper: ShallowWrapper;
  let mockDispatch: jest.Mock<any, any>;

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppSelector as jest.Mock).mockReturnValue(true);
    mockDispatch = jest.fn();
    useAppDispatch.mockReturnValue(mockDispatch);
    wrapper = shallow(<App />);
  
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the TasksSection component", () => {
    expect(wrapper.find(TasksSection)).toHaveLength(1);
  });

  it("renders the ModalCreateTask component when modalCreateTaskOpen is true", () => {
    expect(wrapper.find(ModalCreateTask)).toHaveLength(1);
  });

  it("does not render the ModalCreateTask component when modalCreateTaskOpen is false", () => {
    useAppSelector.mockReturnValue(false);
    wrapper = shallow(<App />);
    expect(wrapper.find(ModalCreateTask)).toHaveLength(0);
  });

  it("calls closeModalCreateTask action when ModalCreateTask onClose is called", () => {
    const closeModalCreateTaskAction = { type: "CLOSE_MODAL_CREATE_TASK" };
    modalActions.closeModalCreateTask.mockReturnValue(closeModalCreateTaskAction);

    useAppSelector.mockReturnValue({ modalCreateTaskOpen: true });
    useAppDispatch.mockReturnValue(mockDispatch);

    wrapper = shallow(<App />);
    const modalCreateTaskComponent = wrapper.find(ModalCreateTask);
    const onClose = modalCreateTaskComponent.prop("onClose");

    onClose();

    expect(mockDispatch).toHaveBeenCalledWith(closeModalCreateTaskAction);
  });

  it("calls createNewTaskHandler action when ModalCreateTask onConfirm is called", () => {
    const createNewTaskAction = { type: "ADD_NEW_TASK" };
    tasksActions.addNewTask.mockReturnValue(createNewTaskAction);

    useAppSelector.mockReturnValue({ modalCreateTaskOpen: true });
    useAppDispatch.mockReturnValue(mockDispatch);

    wrapper = shallow(<App />);
    const modalCreateTaskComponent = wrapper.find(ModalCreateTask);
    const onConfirm = modalCreateTaskComponent.prop("onConfirm");
    const task: Task = { id: "1", title: "Test Task", description: "Test Description", date: new Date().toString(), completed: false,  important: false};

    onConfirm(task);

    expect(mockDispatch).toHaveBeenCalledWith(createNewTaskAction);
  });
});