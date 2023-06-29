import useSortTasks from "./useSortTasks";
import { renderHook, act } from "@testing-library/react-hooks";

describe("useSortTasks", () => {
    const task1 = {
        id: "1",
        title: "test",
        description: "test",
        date: "2021-09-01",
        completed: false,
        important: false,
    };
    const task2 = {
        id: "2",
        title: "test",
        description: "test",
        date: "2021-09-02",
        completed: false,
        important: false,
    };
    const task3 = {
        id: "3",
        title: "test",
        description: "test",
        date: "2021-09-03",
        completed: false,
        important: false,
    };
    const task4 = {
        id: "4",
        title: "test",
        description: "test",
        date: "2021-09-03",
        completed: true,
        important: false,
    };

    it("returns the tasks sorted by date", () => {
        const tasks = [task2, task1, task4, task3];

        const { result } = renderHook(() => useSortTasks(tasks));

        expect(result.current.sortedTasks).toEqual(tasks);

        act(() => {
            result.current.setSortedBy("min-date");
        });

        const res = [task1, task2, task4, task3]

        expect(result.current.sortedTasks).toEqual(
            res
        );

        act(() => {
            result.current.setSortedBy("max-date");
        });

        expect(result.current.sortedTasks).toEqual(res.reverse());
    });


    it("returns the tasks sorted by completed", () => {
        const tasks = [task1, task2, task4, task3];
        const { result } = renderHook(() => useSortTasks(tasks));

        expect(result.current.sortedTasks).toEqual(tasks);

        act(() => {
            result.current.setSortedBy("completed-first");
        });

        const res = [task4, task1, task2, task3]

        expect(result.current.sortedTasks).toEqual(res);

        act(() => {
            result.current.setSortedBy("uncompleted-first");
        });

        expect(result.current.sortedTasks).toEqual(res.reverse());
    });


    it("returns the tasks sorted by order added", () => {
        const tasks = [task1, task2, task4, task3];
        const { result } = renderHook(() => useSortTasks(tasks));

        expect(result.current.sortedTasks).toEqual(tasks);

        act(() => {
            result.current.setSortedBy("order-added");
        });

        expect(result.current.sortedTasks).toEqual(tasks);
    });

    it("returns the original tasks if the sortedBy is empty", () => {
        const tasks = [task1, task2, task4, task3];
        const { result } = renderHook(() => useSortTasks(tasks));

        expect(result.current.sortedTasks).toEqual(tasks);

        act(() => {
            result.current.setSortedBy("");
        });

        expect(result.current.sortedTasks).toEqual(tasks);
    });
});