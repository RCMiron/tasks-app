// generate react component to pass the tests in BtnDeleteTask.test.tsx
import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import { tasksActions } from "../../../store/Tasks.store";
import { Task } from "../../../interfaces";
import { modalActions } from "../../../store/Modal.store";
import { ReactComponent as Trash } from "../../../assets/trash.svg";
import ModalConfirm from "../../Utilities/ModalConfirm";



const BtnDeleteTask = ({ taskId }: { taskId: string }) => {
    const dispatch = useAppDispatch();
    const [isOpened, setIsOpened] = React.useState(false);

    const confirmDelete = () => {
      setIsOpened(false);
        dispatch(tasksActions.removeTask(taskId));
        setIsOpened(false);
    };

    const deleteTask = () => {
        setIsOpened(true);
    };

    return (
      <>
        <button onClick={deleteTask}>
            <Trash />
        </button>

        {isOpened && <ModalConfirm
            onClose={() => setIsOpened(false)}
            onConfirm={confirmDelete}
            text="Are you sure you want to delete this task?"
        />}
      </>
        

    );
}

export default BtnDeleteTask;