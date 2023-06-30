import InputCheckbox from "./InputCheckbox";
import { shallow } from "enzyme";

describe("InputCheckbox", () => {
    const defaultProps = {
        label: "test",
        isChecked: false,
        setChecked: jest.fn(),
    }

    it("renders the label", () => {
        const wrapper = shallow(<InputCheckbox {...defaultProps} />);
        expect(wrapper.find("label").text()).toBe("test");
    });

    it("renders the checkbox as false", () => {
        const wrapper = shallow(<InputCheckbox {...defaultProps} />);
        expect(wrapper.find("input[type='checkbox']").prop("checked")).toBe(false);
    });

    it("renders the checkbox as checked", () => {
        const wrapper = shallow(<InputCheckbox {...defaultProps} isChecked={true} />);
        expect(wrapper.find("input[type='checkbox']").prop("checked")).toBe(true);
    });

    it("calls setChecked when checkbox is clicked", () => {
        const wrapper = shallow(<InputCheckbox {...defaultProps} />);
        const checkbox = wrapper.find("input[type='checkbox']");
        checkbox.simulate("change");
        expect(defaultProps.setChecked).toHaveBeenCalled();
    });
})