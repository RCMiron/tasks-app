// generate a react component to pass the tests in ActionsTaskItem.test.tsx
import React from "react";
import { Task } from "../../../interfaces";
import BtnEditTask from "./BtnEditTask";
import BtnDeleteTask from "./BtnDeleteTask";
import BtnToggleCompleted from "./BtnToggleCompleted";
import BtnMarkAsImportant from "./BtnMarkAsImportant";

const ActionsTaskItem = ({ task }: { task: Task }) => {
    return (
        <div>
            <BtnEditTask task={task} />
            <BtnDeleteTask taskId={task.id} />
            <BtnToggleCompleted taskCompleted={task.completed} taskId={task.id}/>
            <BtnMarkAsImportant taskImportant={task.important} taskId={task.id}/>
        </div>
    );
}

export default ActionsTaskItem;