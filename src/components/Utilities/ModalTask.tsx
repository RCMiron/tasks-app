// generate a react component to pass the tests in ModalTask.test.tsx
import React from "react";
import { Task } from "../../interfaces";
import InputCheckbox from "./InputCheckbox";



import Modal from "./Modal";

interface Props {
  onClose: () => void;
  onConfirm: (task: Task) => void;
  nameForm: string;
  task?: Task;
}

const ModalTask = ({ onClose, onConfirm, nameForm, task }: Props) => {
  const [title, setTitle] = React.useState(task?.title || "");
  const [description, setDescription] = React.useState(task?.description || "");
  const [completed, setCompleted] = React.useState(task?.completed || false);
  const [important, setImportant] = React.useState(task?.important || false);
  const [date, setDate] = React.useState(task?.date || new Date().toString());
  
  

  const confirm = () => {
    if (!title) return;
    onConfirm({ title, description, completed, important, date, id: task?.id || "" });
    onClose();
  };

  const cancel = () => {
    onClose();
  };

  return (
    <Modal onClose={cancel} title={nameForm}>
      <div className="modal__header">
        <h2 >{nameForm}</h2>
        <button onClick={cancel}>
        </button>
      </div>
      <div className="modal__body">
        <form onSubmit={confirm}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-test-id="title"
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            data-test-id="description"
          />
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            data-test-id='date'
          />
          <InputCheckbox
            data-test-id="important"
            label="Important"
            isChecked={important}
            setChecked={() => setImportant(prev => !prev)}
          />
          <InputCheckbox
            data-test-id="completed"
            label="Completed"
            isChecked={completed}
            setChecked={() => setCompleted(prev => !prev)}
          />
          <button type="submit" >SUBMIT</button>
        </form>
      </div>
    </Modal>
  );
}

export default ModalTask;