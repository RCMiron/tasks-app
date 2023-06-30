import BtnDeleteTask from "./BtnDeleteTask";
import { ReactComponent as Trash } from "../../../assets/trash.svg";
import ModalConfirm from "../../Utilities/ModalConfirm";


import { shallow } from "enzyme";

const mockDispatch = jest.fn();
jest.mock("../../../store/hooks", () => ({
    useAppDispatch: () => mockDispatch
}));

const mockRemoveTask = jest.fn()
jest.mock("../../../store/Tasks.store", () => ({
    tasksActions: {
        removeTask: () => mockRemoveTask()
    }
}))

describe("BtnDeleteTask", () => {
    it("renders without crashing", () => {
        shallow(<BtnDeleteTask taskId="1" />);
    });

    it("renders the trash icon", () => {
        const wrapper = shallow(<BtnDeleteTask taskId="1" />);
        expect(wrapper.find(Trash).exists()).toBe(true);
    });

    it("renders the modal", () => {
        const wrapper = shallow(<BtnDeleteTask taskId="1" />);
        const button = wrapper.find("button");
        button.simulate("click");
        expect(wrapper.find(ModalConfirm).exists()).toBe(true);
    });

    it("calls removeTask when modal confirm is clicked", () => {
        mockRemoveTask.mockReturnValue({ type: "REMOVE_TASK" });
        const wrapper = shallow(<BtnDeleteTask taskId="1" />);
        const button = wrapper.find("button");
        button.simulate("click");
        const modal = wrapper.find(ModalConfirm);
        modal.prop("onConfirm")();
        expect(mockRemoveTask).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledWith({ type: "REMOVE_TASK" });
    });

    it("closes the modal when modal confirm is clicked", () => {
        mockRemoveTask.mockReturnValue({ type: "REMOVE_TASK" });
        const wrapper = shallow(<BtnDeleteTask taskId="1" />);
        const button = wrapper.find("button");
        button.simulate("click");
        const modal = wrapper.find(ModalConfirm);
        modal.prop("onClose")();
        expect(wrapper.find(ModalConfirm).exists()).toBe(false);
    })
})