import { debug } from "console";
import Modal from "./Modal";
import { shallow } from "enzyme";

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    createPortal: (node: any) => node
}));

describe("Modal", () => {
    const defaultProps = {
        onClose: jest.fn(),
        title: "title"
    }

    it("renders without crashing", () => {
        shallow(<Modal {...defaultProps}><div/></Modal>);
    });

    it("renders the children", () => {
        const wrapper = shallow(<Modal {...defaultProps}><div id="test" /></Modal>);
        expect(wrapper.find("#test").exists()).toBe(true);
    });

    it("renders the title", () => {
        const wrapper = shallow(<Modal {...defaultProps}><div id="test" /></Modal>);
        expect(wrapper.find("h2").text()).toBe("title");
    })

    it("calls onClose when close button is clicked", () => {
        const wrapper = shallow(<Modal {...defaultProps}><div id="test" /></Modal>);
        const button = wrapper.find("button");
        button.simulate("click");
        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it("calls onClose when backdrop is clicked", () => {
        const wrapper = shallow(<Modal {...defaultProps}><div id="test" /></Modal>);
        const backdrop = wrapper.find("[data-test-id='modal-backdrop']");
        backdrop.simulate("click", { target: backdrop, currentTarget: backdrop });
        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it("does not call onClose when backdrop is clicked but target is not backdrop", () => {
        const wrapper = shallow(<Modal {...defaultProps}><div id="test" /></Modal>);
        const backdrop = wrapper.find("[data-test-id='modal-backdrop']");
        backdrop.simulate("click", { target: backdrop, currentTarget: null });
        expect(defaultProps.onClose).not.toHaveBeenCalled();
    })
})