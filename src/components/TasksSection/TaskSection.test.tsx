import TasksSection from "./TasksSection";
import TaskItem from "./TaskItem/TaskItem";
import ButtonsSort from "./ButtonsSort";
import { shallow } from "enzyme";
import { before } from "node:test";


const mockUseAppDispatch = jest.fn();
jest.mock("../../store/hooks", () => ({
    useAppSelector: jest.fn().mockReturnValue({ tasks: [] }),
    useAppDispatch: () => mockUseAppDispatch(),
}));

const mockUseSortTasks = jest.fn();
jest.mock("../hooks/useSortTasks", () => ({
    useSortTasks: () => mockUseSortTasks()
}));

const mockOpenModalCreateTask = jest.fn();
jest.mock("../../store/Modal.store", () => ({
    modalActions: {
        openModalCreateTask: () => mockOpenModalCreateTask(),
    },
}));

beforeEach(() => {
    mockUseSortTasks.mockReturnValue({
        sortedTasks: [],
        sortedBy: "",
        setSortedBy: jest.fn(),
    });
})

afterEach(() => jest.clearAllMocks())

describe("TasksSection", () => {
    it("renders the sort button", () => {
        const wrapper = shallow(<TasksSection />);
        expect(wrapper.find("ButtonsSort")).toHaveLength(1);
    });

    it("calls setSortedBy when ButtonsSort onChange is called", () => {
        const mockSetSortedBy = jest.fn();
        mockUseSortTasks.mockReturnValue({
            sortedTasks: [],
            sortedBy: "",
            setSortedBy: mockSetSortedBy,
        });
        const wrapper = shallow(<TasksSection />);
        wrapper.find(ButtonsSort).invoke("setSortedBy")("order-added");
        expect(mockSetSortedBy).toHaveBeenCalledWith("order-added");
    })

    it("passes the correct props to ButtonsSort", () => {
        const sortedTasksResult = {
            sortedTasks: [],
            sortedBy: "",
            setSortedBy: jest.fn(),
        }
        mockUseSortTasks.mockReturnValue(sortedTasksResult)
        const wrapper = shallow(<TasksSection />);
        expect(wrapper.find("ButtonsSort").prop("sortedBy")).toBe(sortedTasksResult.sortedBy);
        expect(wrapper.find("ButtonsSort").prop("setSortedBy")).toBe(sortedTasksResult.setSortedBy);
    });

    it("renders the correct number of Task components", () => {
        const sortedTasksResult = {
            sortedTasks: [{ id: 1, name: "Task 1", completed: false }],
            sortedBy: "",
            setSortedBy: jest.fn(),
        };
        mockUseSortTasks.mockReturnValue(sortedTasksResult)
        const wrapper = shallow(<TasksSection />);
        expect(wrapper.find(TaskItem)).toHaveLength(1);
    });

    it("passes the correct props to Task", () => {
        const sortedTasksResult = {
            sortedTasks: [{ id: 1, name: "Task 1", completed: false }],
            sortedBy: "",
            setSortedBy: jest.fn(),
        }
        mockUseSortTasks.mockReturnValue(sortedTasksResult)
        const wrapper = shallow(<TasksSection />);
        expect(wrapper.find(TaskItem).prop("task")).toBe(sortedTasksResult.sortedTasks[0]);
    });

    it("renders the correct number of Task components when sortedTasks is empty", () => {
        const sortedTasksResult = {
            sortedTasks: [],
            sortedBy: "",
            setSortedBy: jest.fn(),
        }
        mockUseSortTasks.mockReturnValue(sortedTasksResult)
        const wrapper = shallow(<TasksSection />);
        expect(wrapper.find(TaskItem)).toHaveLength(0);
    });
    
    it("dispatches the correct action when the add task button is clicked", () => {
        const mockDispatch = jest.fn();
        mockOpenModalCreateTask.mockReturnValue({ type: "OPEN_MODAL_CREATE_TASK" });
        mockUseAppDispatch.mockReturnValue(mockDispatch);
        const wrapper = shallow(<TasksSection />);
        wrapper.find("button").simulate("click");
        expect(mockDispatch).toHaveBeenCalledWith({ type: "OPEN_MODAL_CREATE_TASK" });
    });
})