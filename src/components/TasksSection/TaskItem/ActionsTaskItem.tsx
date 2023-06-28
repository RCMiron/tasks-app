import React from "react";
import { Task } from "../../../interfaces";
import BtnEditTask from "./BtnEditTask";
import BtnMarkAsImportant from "./BtnMarkAsImportant";
import BtnDeleteTask from "./BtnDeleteTask";
import BtnToggleCompleted from "./BtnToggleCompleted";

const ActionsTaskItem: React.FC<{ task: Task; }> = ({
  task,
}) => {
  return (
    <>
      <div
        className={`flex border-dashed border-slate-200 dark:border-slate-700/[.3] items-center`}
      >
        <BtnToggleCompleted
          taskCompleted={task.completed}
          taskId={task.id}
        />
        <BtnMarkAsImportant taskId={task.id} taskImportant={task.important} />
        <BtnDeleteTask taskId={task.id} />
        <BtnEditTask task={task} />
      </div>
    </>
  );
};

export default ActionsTaskItem;
