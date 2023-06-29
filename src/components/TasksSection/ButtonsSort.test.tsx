import ButtonsSort from "./ButtonsSort";
import { shallow } from "enzyme";

describe("ButtonsSort", () => {
    it("renders the correct option elements", () => {
        const wrapper = shallow(<ButtonsSort sortedBy="" setSortedBy={() => {}} />);
        expect(wrapper.find("option").at(0).text()).toBe("Sort by");
        expect(wrapper.find("option").at(1).text()).toBe("Order added");
        expect(wrapper.find("option").at(2).text()).toBe("Earlier first");
        expect(wrapper.find("option").at(3).text()).toBe("Later first");
        expect(wrapper.find("option").at(4).text()).toBe("Completed first");
        expect(wrapper.find("option").at(5).text()).toBe("Uncompleted first");
    });

    it("calls setSortedBy when select value changes", () => {
        const mockSetSortedBy = jest.fn();
        const wrapper = shallow(<ButtonsSort sortedBy="" setSortedBy={mockSetSortedBy} />);
        wrapper.find("select").simulate("change", { target: { value: "order-added" } });
        expect(mockSetSortedBy).toHaveBeenCalledWith("order-added");
    });
});