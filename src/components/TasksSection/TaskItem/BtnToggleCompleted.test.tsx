import BtnToggleCompleted from "./BtnToggleCompleted";
import { shallow } from "enzyme";
import { ReactComponent as SvgX } from "../../../assets/x.svg";
import { ReactComponent as Check } from "../../../assets/check.svg";


const mockDispatch = jest.fn();
jest.mock("../../../store/hooks", () => ({
    useAppDispatch: () => mockDispatch,
}));

const mockToggleCompleted = jest.fn();
jest.mock("../../../store/Tasks.store", () => ({
    tasksActions: {
        toggleTaskCompleted: (id: string) => mockToggleCompleted(id),
    },
}))

describe("BtnToggleCompleted", () => {
    it("renders the button", () => {
        const wrapper = shallow(<BtnToggleCompleted taskCompleted={true} taskId="id"/>);
        expect(wrapper.find("button")).toHaveLength(1);
    });

    it("calls toggleCompleted action when button is clicked", () => {
        const toggleCompletedAction = { type: "TOGGLE_COMPLETED" };
        mockToggleCompleted.mockReturnValue(toggleCompletedAction);

        const wrapper = shallow(<BtnToggleCompleted taskCompleted={true} taskId="id"/>);
        const button = wrapper.find("button");
        button.simulate("click");

        expect(mockDispatch).toHaveBeenCalledWith(toggleCompletedAction);
    });

    it("calls toggleCompleted action with the correct taskId", () => {
        const toggleCompletedAction = { type: "TOGGLE_COMPLETED" };
        mockToggleCompleted.mockReturnValue(toggleCompletedAction);

        const wrapper = shallow(<BtnToggleCompleted taskCompleted={true} taskId="id"/>);
        const button = wrapper.find("button");
        button.simulate("click");

        expect(mockToggleCompleted).toHaveBeenCalledWith("id");
    });

    it("renders the correct icon when taskCompleted is true", () => {
        const wrapper = shallow(<BtnToggleCompleted taskCompleted={true} taskId="id"/>);
        expect(wrapper.find(Check)).toHaveLength(1)
    });

    it("renders the correct icon when taskCompleted is false", () => {
        const wrapper = shallow(<BtnToggleCompleted taskCompleted={false} taskId="id"/>);
        expect(wrapper.find(SvgX)).toHaveLength(1)
    });


})