import ModalConfirm from "./ModalConfirm";
import { shallow } from "enzyme";


describe("ModalConfirm", () => {
    it("renders without crashing", () => {
        shallow(<ModalConfirm onConfirm={jest.fn()} onClose={jest.fn()} text="test" />);
    });

    it("renders the text", () => {
        const wrapper = shallow(<ModalConfirm onConfirm={jest.fn()} onClose={jest.fn()} text="test" />);
        expect(wrapper.find("p").text()).toBe("test");
    });

    it("calls onConfirm when confirm button is clicked", () => {
        const mockOnConfirm = jest.fn();
        const wrapper = shallow(<ModalConfirm onConfirm={mockOnConfirm} onClose={jest.fn()} text="test" />);
        const button = wrapper.find("[data-test-id='modal-confirm']");
        button.simulate("click");
        expect(mockOnConfirm).toHaveBeenCalled();
    });

    it("calls onClose when close button is clicked", () => {
        const mockOnClose = jest.fn();
        const wrapper = shallow(<ModalConfirm onConfirm={jest.fn()} onClose={mockOnClose} text="test" />);
        const button = wrapper.find("[data-test-id='modal-close']");
        button.simulate("click");
        expect(mockOnClose).toHaveBeenCalled();
    });

    it("calls onClose when Modal is clicked", () => {
        const mockOnClose = jest.fn();
        const wrapper = shallow(<ModalConfirm onConfirm={jest.fn()} onClose={mockOnClose} text="test" />);
        const modal = wrapper.find("Modal");
        modal.invoke("onClose")();
        expect(mockOnClose).toHaveBeenCalled();
    } );
})

