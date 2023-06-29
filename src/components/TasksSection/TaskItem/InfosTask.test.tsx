import InfosTask from "./InfosTask";
import { Task } from "../../../interfaces";
import { shallow } from "enzyme";

jest.mock("../../hooks/useDate", () => ({
    __esModule: true,
    default: () => "2021-09-01",
}));

describe("InfosTask", () => {
    const task: Task = {
        id: "1",
        title: "test",
        description: "test",
        date: new Date().toString(),
        completed: false,
        important: false,
    };
    
    it("renders the task properties", () => {
        const wrapper = shallow(<InfosTask task={task} />);
        expect(wrapper.find(".font-medium").text()).toEqual(task.title);
        expect(wrapper.find(".description").text()).toEqual(task.description);        
    });

    it("renders the date", () => {
        const wrapper = shallow(<InfosTask task={task} />);
        expect(wrapper.find("time").text()).toEqual(" 2021-09-01");
    })
})