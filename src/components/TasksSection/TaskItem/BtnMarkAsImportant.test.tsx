import BtnMarkAsImportant from "./BtnMarkAsImportant";
import { shallow } from "enzyme";

const mockDispatch = jest.fn();
jest.mock("../../../store/hooks", () => ({
    useAppDispatch: () => mockDispatch,
}));

jest.mock("../../../store/Tasks.store", () => ({
    tasksActions: {
        markAsImportant: (id: string) => ({ type: "TOGGLE_IMPORTANT" }),
    },
}))

describe("BtnMarkAsImportant", () => {
    it("renders the button", () => {
        const wrapper = shallow(<BtnMarkAsImportant taskImportant={true} taskId="id" />);
        expect(wrapper.find("button")).toHaveLength(1);
        expect(wrapper.find("button").props().title).toEqual("unmark as important");
    });

    it("renders the button", () => {
        const wrapper = shallow(<BtnMarkAsImportant taskImportant={false} taskId="id" />);
        expect(wrapper.find("button")).toHaveLength(1);
        expect(wrapper.find("button").props().title).toEqual("mark as important");
    });

    it("calls toggleImportant action when button is clicked", () => {
        const toggleImportantAction = { type: "TOGGLE_IMPORTANT" };
        mockDispatch.mockReturnValue(toggleImportantAction);

        const wrapper = shallow(<BtnMarkAsImportant taskImportant={true} taskId="id" />);
        const button = wrapper.find("button");
        button.simulate("click");

        expect(mockDispatch).toHaveBeenCalledWith(toggleImportantAction);
    })
});