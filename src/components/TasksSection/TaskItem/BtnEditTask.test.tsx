import BtnEditTask from "./BtnEditTask";
import { shallow } from "enzyme";

import { Task } from "../../../interfaces";

const mockDispatch = jest.fn();
jest.mock( "../../../store/hooks", () => ({
    useAppDispatch: () => mockDispatch,
}));

jest.mock("../../../store/Tasks.store", () => ({
    tasksActions: {
        editTask: (task: Task) => ({ type: "EDIT_TASK" }),
    },
}));

describe("BtnEditTask", () => {

    const task: Task = {
        id: "1",
        title: "test",
        description: "test",
        date: new Date().toString(),
        completed: false,
        important: false,
    };

    it("renders the button", () => {
        const wrapper = shallow(<BtnEditTask task={task} />);
        expect(wrapper.find("button")).toHaveLength(1);
        expect(wrapper.find("button").props().title).toEqual("edit task");
    });

    it("displays modal when edit button is clicked", () => {
        const wrapper = shallow(<BtnEditTask task={task} />);
        const button = wrapper.find("button");
        button.simulate("click");

        expect(wrapper.find("ModalCreateTask")).toHaveLength(1);
    });

    it("calls editTask action when modal is submitted", () => {
        const editTaskAction = { type: "EDIT_TASK" };
        mockDispatch.mockReturnValue(editTaskAction);

        const wrapper = shallow(<BtnEditTask task={task} />);
        const button = wrapper.find("button");
        button.simulate("click");

        const modal = wrapper.find("ModalCreateTask");
        modal.invoke("onConfirm")();

        expect(mockDispatch).toHaveBeenCalledWith(editTaskAction);
    });

    it("calls closeModalEditTask action when modal is submitted", () => {
        const editTaskAction = { type: "EDIT_TASK" };
        mockDispatch.mockReturnValue(editTaskAction);

        const wrapper = shallow(<BtnEditTask task={task} />);
        const button = wrapper.find("button");
        button.simulate("click");

        const modal = wrapper.find("ModalCreateTask");
        modal.invoke("onClose")();

        expect(wrapper.find("ModalCreateTask")).toHaveLength(0);
    })
})