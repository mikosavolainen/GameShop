import "../App.css";

export default function Input({
  placeholder,
  className = "",
  outerClassName = "",
  label,
  icon,
  style,
  size,
  type,
  onChange,
  focus,
  blur,
  required = false,
  value,
  error,
  name,
}: {
  placeholder: string;
  className?: string;
  outerClassName?: string;
  label?: string;
  icon: string;
  style: "light" | "dark";
  size: "small" | "big";
  type: "text" | "password" | "email";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  focus?: React.FocusEventHandler<HTMLInputElement>
  blur?: React.FocusEventHandler<HTMLInputElement>
  required?: boolean;
  value?: string;
  error?: string;
  name?: string;
}) {
  return (
    <div className={outerClassName}>
      {label && (
        <label className="text-base block m-0 mt-1 mb-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className={`relative block w-full ${(() => {
        switch (size) {
          case "small":
            return "border";
          case "big":
            return "border-2";
        }
      })()} ${(() => {
        switch (style) {
          case "light":
            return "bg-wrench-neutral-white";
          case "dark":
            return "bg-wrench-neutral-4";
        }
      })()} border-wrench-neutral-3 rounded-full overflow-hidden ${className}`}>
        <span className={`${style === "dark" ? "text-wrench-neutral-3" : "text-wrench-neutral-2"} material-symbols-rounded block absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none !text-[20px]`}>
          {icon}
        </span>
        <input
          onFocus={focus}
          onBlur={blur}
          onChange={onChange}
          type={`${type}`}
          name={name}
          className={`${(() => {
            switch (size) {
              case "small":
                return "text-base p-1 pl-10";
              case "big":
                return "text-lg px-2 py-1.5 pl-11";
            }
          })()} ${(() => {
            switch (style) {
              case "light":
                return "text-wrench-neutral-dark placeholder:text-wrench-neutral-2";
              case "dark":
                return "text-wrench-neutral-white bg-wrench-neutral-dark placeholder:text-wrench-neutral-3";
            }
          })()} w-full inline-block outline-none`}
          placeholder={`${placeholder}`}
          value={value}
        />
      </div>
      {error && <p className="text-wrench-accent-gold mt-1">{error}</p>}
    </div>
  );
}
