import "../App.css";

export default function Input({
  placeholder,
  className = "",
  label,
  icon,
  style,
  size,
  type,
  onChange,
}: {
  placeholder: string;
  className?: string;
  label?: string;
  icon: "search" | "key" | "person" | "mail";
  style: "light" | "dark";
  size: "small" | "big";
  type: "text" | "password" | "email";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <>
      {label && (
        <label className="text-base block m-0 mt-1 mb-1">
          {label}
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
        <span className="text-wrench-neutral-3 material-icons block absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          {icon}
        </span>
        <input
          onChange={onChange}
          type={`${type}`}
          className={`${(() => {
            switch (size) {
              case "small":
                return "text-base p-1 pl-10";
              case "big":
                return "text-xl p-2 pl-10";
            }
          })()} ${(() => {
            switch (style) {
              case "light":
                return "text-wrench-neutral-dark placeholder:text-wrench-neutral-2";
              case "dark":
                return "text-wrench-neutral-white placeholder:text-wrench-neutral-3";
            }
          })()} w-full inline-block outline-none`}
          placeholder={`${placeholder}`}
        />
      </div>
    </>
  );
}
