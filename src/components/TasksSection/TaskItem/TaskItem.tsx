import React from "react";
import { Task } from "../../../interfaces";
import InfosTask from "./InfosTask";
import ActionsTaskItem from "./ActionsTaskItem";

const TaskItem: React.FC<{ task: Task }> = ({
  task,
}) => {
  return (
    <>
      <li key={task.id}>
        <article
          className={`bg-slate-100 rounded-lg p-3 sm:p-4 flex text-left transition hover:shadow-lg hover:shadow-slate-300 dark:bg-slate-800 dark:hover:shadow-transparent flex-row sm:h-32`}
        >
          <InfosTask task={task} />
          <ActionsTaskItem task={task} />
        </article>
      </li>
    </>
  );
};

export default React.memo(TaskItem);
