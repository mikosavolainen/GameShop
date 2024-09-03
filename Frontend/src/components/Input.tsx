import "../App.css";
export default function Input({
  placeholder,
  className,
  label,
  icon,
  variation,
  type,
  onChange,
}: {
  placeholder: string;
  className?: string;
  label?: string;
  icon: "search" | "key" | "person" | "mail";
  variation: "small-white" | "normal-white" | "small-dark" | "normal-dark";
  type: "text" | "password" | "email";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  let string = "";
  switch (variation) {
    case "small-white":
      string =
        "bg-wrench-neutral-white border-2 text-wrench-neutral-dark text-base p-1 pl-10 placeholder:text-wrench-neutral-2";
      break;
    case "normal-white":
      string =
        "bg-wrench-neutral-white border-2 text-wrench-neutral-dark text-xl p-2 pl-10 placeholder:text-wrench-neutral-2";
      break;
    case "small-dark":
      string =
        "bg-wrench-neutral-4 border text-wrench-neutral-white text-base p-1 pl-10 placeholder:text-wrench-neutral-3";
      break;
    case "normal-dark":
      string =
        "bg-wrench-neutral-4 border text-wrench-neutral-white text-xl p-2 pl-10 placeholder:text-wrench-neutral-3";
      break;
  }
  return (
    <>
      {label && (
        <label className="text-base block m-0 mt-1 mb-1">
          {label}
        </label>
      )}
      <div className={`${className} relative`}>
        <span className="text-wrench-neutral-3 material-icons block absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          {icon}
        </span>
        <input
          onChange={onChange}
          type={`${type}`}
          className={`${string} outline-none border-wrench-neutral-3 rounded-full`}
          placeholder={`${placeholder}`}
        />
      </div>
    </>
  );
}
