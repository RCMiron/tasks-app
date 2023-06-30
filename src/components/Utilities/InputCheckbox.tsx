import React from "react";

const InputCheckbox: React.FC<{
    label: string;
    isChecked: boolean;
    setChecked: (value: React.SetStateAction<boolean>) => void;
  }> = ({ isChecked, setChecked, label }) => {
    return (
      <label className="mb-0 flex items-center cursor-pointer">
        <div className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
          {isChecked && (
            <span className="bg-rose-500 w-2 h-2 block rounded-full"></span>
          )}
        </div>
        <span className="order-1 flex-1">{label}</span>
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={() => setChecked((prev: boolean) => !prev)}
        />
      </label>
    );
  };

  export default InputCheckbox;