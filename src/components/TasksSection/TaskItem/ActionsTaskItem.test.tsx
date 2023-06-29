import ActionsTaskItem from "./ActionsTaskItem";
import { shallow } from "enzyme";
import { Task } from "../../../interfaces";

import BtnEditTask from "./BtnEditTask";
import BtnMarkAsImportant from "./BtnMarkAsImportant";
import BtnDeleteTask from "./BtnDeleteTask";
import BtnToggleCompleted from "./BtnToggleCompleted";


describe("ActionsTaskItem", () => {
    const task: Task = {
        id: "1",
        title: "test",
        description: "test",
        date: new Date().toString(),
        completed: false,
        important: false,
    };

    it("renders the component", () => {
        const wrapper = shallow(<ActionsTaskItem  task={task} />);
        expect(wrapper.find("div")).toHaveLength(1);
    });

    it("renders the BtnEditTask component", () => {
        const wrapper = shallow(<ActionsTaskItem  task={task} />);
        expect(wrapper.find(BtnEditTask)).toHaveLength(1);
    })

    it("renders the BtnDeleteTask component", () => {
        const wrapper = shallow(<ActionsTaskItem  task={task} />);
        expect(wrapper.find(BtnDeleteTask)).toHaveLength(1);
    })

    it("renders the BtnCompleteTask component", () => {
        const wrapper = shallow(<ActionsTaskItem  task={task} />);
        expect(wrapper.find(BtnToggleCompleted)).toHaveLength(1);
    });

    it("renders the BtnImportantTask component", () => {
        const wrapper = shallow(<ActionsTaskItem  task={task} />);
        expect(wrapper.find(BtnMarkAsImportant)).toHaveLength(1);
    })


})