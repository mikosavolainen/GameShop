import { useState } from "react";

const Checkbox = ({ label }: { label: string }) => {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex gap-2">
      <input type="checkbox" id="some_id" className="
        relative peer shrink-0
        appearance-none w-4 h-4 border border-blue-500 rounded-sm bg-white
        mt-1
        checked:bg-blue-800 checked:border-0
        focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-100
        disabled:border-steel-400 disabled:bg-steel-400
      "
      />
      <label htmlFor="some_id">This is the checkbox label</label>
      <svg
        className="
          absolute 
          w-4 h-4 mt-1
          hidden peer-checked:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
};

export default Checkbox;
