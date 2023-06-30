import ModalTask from "./ModalTask";
import { shallow, ShallowWrapper } from "enzyme";
import {Task} from "../../interfaces";

describe("ModalTask", () => {
    const task: Task = {
        id: "1",
        description: "test",
        completed: false,
        important: false,
        title: "test",
        date: new Date().toString()
    };

    const defaultProps = {
        onClose: jest.fn(),
        onConfirm: jest.fn(),
        nameForm: "test",
    };

    it("renders without crashing", () => {
        shallow(<ModalTask {...defaultProps} />);
    });

    it("renders the Modal component", () => {
        const wrapper = shallow(<ModalTask {...defaultProps} />);
        expect(wrapper.find("Modal")).toHaveLength(1);
    });

    it("renders the form fields with initial values", () => {
        const wrapper = shallow(<ModalTask {...defaultProps} task={task} />);
        expect(wrapper.find("[data-test-id='title']").prop("value")).toBe(task.title);
        expect(wrapper.find("[data-test-id='description']").prop("value")).toBe(task.description);
        expect(wrapper.find("[data-test-id='date']").prop("value")).toBe(task.date);
        expect(wrapper.find("[data-test-id='important']").prop("isChecked")).toBe(task.important);
        expect(wrapper.find("[data-test-id='completed']").prop("isChecked")).toBe(task.completed);
    });

    it("renders the form fields with empty values", () => {
        const wrapper = shallow(<ModalTask {...defaultProps} />);
        expect(wrapper.find("[data-test-id='title']").prop("value")).toBe("");
        expect(wrapper.find("[data-test-id='description']").prop("value")).toBe("");
        expect(wrapper.find("[data-test-id='date']").prop("value")).toBeTruthy();
        expect(wrapper.find("[data-test-id='important']").prop("isChecked")).toBe(false);
        expect(wrapper.find("[data-test-id='completed']").prop("isChecked")).toBe(false);
    });

    it("calls onClose when Modal onClose is called", () => {
        const onClose = jest.fn();
        const wrapper = shallow(<ModalTask {...defaultProps} onClose={onClose} />);
        wrapper.find("Modal").prop("onClose")();
        expect(onClose).toHaveBeenCalled();
    });

    it("calls onConfirm and onClose when form is submitted", () => {
        const wrapper = shallow(<ModalTask {...defaultProps}  />);
        // populate the form fields
        wrapper.find("[data-test-id='title']").simulate("change", { target: { value: "test" } });
        wrapper.find("[data-test-id='description']").simulate("change", { target: { value: "test" } });
        wrapper.find("[data-test-id='date']").simulate("change", { target: { value: "test" } });
        wrapper.find("[data-test-id='important']").invoke("setChecked")(true);
        wrapper.find("[data-test-id='completed']").invoke("setChecked")(true);

        wrapper.find("form").simulate("submit", { preventDefault: () => {} });

        expect(defaultProps.onConfirm).toHaveBeenCalled();
        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it("does not call onConfirm and onClose when form is submitted and title is empty", () => {
        const wrapper = shallow(<ModalTask {...defaultProps}  />);
        // populate the form fields
        wrapper.find("[data-test-id='title']").simulate("change", { target: { value: "" } });
        wrapper.find("[data-test-id='description']").simulate("change", { target: { value: "test" } });
        wrapper.find("[data-test-id='date']").simulate("change", { target: { value: "test" } });
        wrapper.find("[data-test-id='important']").invoke("setChecked")(true);
        wrapper.find("[data-test-id='completed']").invoke("setChecked")(true);

        wrapper.find("form").simulate("submit", { preventDefault: () => {} });

        expect(defaultProps.onConfirm).not.toHaveBeenCalled();
        expect(defaultProps.onClose).not.toHaveBeenCalled();
    })
})