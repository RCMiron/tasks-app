import TaskItem from "./TaskItem";
import {Task} from "../../../interfaces";
import { shallow } from "enzyme";

describe("TaskItem", () => {
    const task: Task = {
        id: "1",
        title: "test",
        description: "test",
        date: new Date().toString(),
        completed: false,
        important: false,
    };

    it("renders the InfosTask component", () => {
        const wrapper = shallow(<TaskItem task={task} />);
        expect(wrapper.find("InfosTask")).toHaveLength(1);
    });

    it("renders the ActionsTaskItem component", () => {
        const wrapper = shallow(<TaskItem task={task} />);
        expect(wrapper.find("ActionsTaskItem")).toHaveLength(1);
    });
});