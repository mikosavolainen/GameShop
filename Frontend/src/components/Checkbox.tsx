const Checkbox = ({ label, id, name, className, error, required = false, onChange}: { label: string, id: string, name?: string, className?: string, error?: string, required: boolean, onChange?: React.MouseEventHandler<HTMLInputElement>}) => {
  return (
    <div className={`${className}`}>
      <div className={`inline-flex items-center gap-2 relative hover:cursor-pointer`}>
        <input
          type="checkbox"
          id={id}
          className="
            peer relative shrink-0 appearance-none size-[18px] border border-box border-wrench-neutral-2 rounded bg-white
            checked:bg-blue-800 checked:border-wrench-purple-2 checked:bg-wrench-purple hover:cursor-pointer
          "
          onClick={onChange}
          name={name}
        />
        <label htmlFor={id} className="hover:cursor-pointer">{label}{required && <span className="text-red-500">*</span>}</label>
        
        {/* Check icon */}
        <span
          className="
            absolute top-1 left-[1px]
            hidden peer-checked:block pointer-events-none
            text-white text-[12px] leading-none
          "
        >
          <i className="material-symbols-rounded !text-[16px]">check</i>
        </span>
      </div>
      {error && <p className="text-wrench-accent-gold mt-1">{error}</p>}
    </div>
  );
};

export default Checkbox;
