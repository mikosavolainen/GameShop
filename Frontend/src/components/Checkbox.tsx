const Checkbox = ({ label, id, name, className, error, required = false}: { label: string, id: string, name?: string, className?: string, error?: string, required: boolean}) => {
  return (
    <div className={`${className}`}>
      <div className={`flex items-center gap-2 relative`}>
        <input
          type="checkbox"
          id={id}
          className="
            peer relative shrink-0 appearance-none w-[20px] h-[20px] border border-box border-wrench-neutral-2 rounded bg-white
            checked:bg-blue-800 checked:border-wrench-purple-2 checked:bg-wrench-purple
          "
          name={name}
        />
        <label htmlFor={id}>{label}{required && <span className="text-red-500">*</span>}</label>
        
        {/* Check icon */}
        <span
          className="
            absolute top-1 left-0.5
            hidden peer-checked:block pointer-events-none
            text-white text-[12px] leading-none
          "
        >
          <i className="material-icons !text-[16px]">checked</i>
        </span>
      </div>
      {error && <p className="text-wrench-accent-gold mt-1">{error}</p>}
    </div>
  );
};

export default Checkbox;
