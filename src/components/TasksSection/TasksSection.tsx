import React from "react";
import { useAppSelector } from "../../store/hooks";
import { useAppDispatch } from "../../store/hooks";
import { modalActions } from "../../store/Modal.store";
import useSortTasks from "../hooks/useSortTasks";
import ButtonsSort from "../TasksSection/ButtonsSort";
import TaskItem from "../TasksSection/TaskItem/TaskItem";

const TasksSection: React.FC = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const dispatch = useAppDispatch();

  const { sortedBy, setSortedBy, sortedTasks } = useSortTasks(tasks);

  const openModalHandler = () => {
    dispatch(modalActions.openModalCreateTask());
  };


  return (
    <main className=" pt-5 pb-8 sm:pb-16 px-3 md:px-8 md:w-full xl:w-8/12 m-auto min-h-screen">
      <section>

      <ButtonsSort
        sortedBy={sortedBy}
        setSortedBy={setSortedBy}
      />
      <ul
        className={`tasksList mt-4 grid gap-2 sm:gap-4 xl:gap-6 grid-cols-1`}
      >
        {sortedTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        <li>
          <button
            onClick={openModalHandler}
            className={`border-2 border-slate-300
             text-slate-400 w-full rounded-lg
              border-dashed transition hover:bg-slate-300
               hover:text-slate-500
               dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300 h-20 sm:h-32`}
          >
            Add new task
          </button>
        </li>
      </ul>
    </section>
    </main>
  );
};

export default TasksSection;
