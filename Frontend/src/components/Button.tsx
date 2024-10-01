import { Link } from 'wouter'

/**
 * Button component renders a customizable button element.
 * 
 * @param {Object} props - The props object.
 * @param {string} props.type - The type of button (e.g., 'submit', 'button', etc.).
 * @param {string} [props.style='neutral'] - The style variant of the button (e.g., 'primary', 'secondary', 'neutral').
 * @param {string} [props.size='small'] - The size of the button (e.g., 'small', 'medium', 'large').
 * @param {string} [props.icon] - Optional google icon name to be displayed within the button.
 * @param {string} props.text - The text to be displayed on the button.
 * @param {boolean} [props.disabled=false] - If true, disables the button.
 * @param {string} [props.className] - Additional class names for styling the button.
 * 
 * @returns {JSX.Element} The rendered button element.
 */
export default function Button({
  href,
  type,
  style = 'neutral',
  size = 'small',
  icon,
  text,
  disabled,
  className,
  onClick
}: {
  href?: string,
  type: 'link' | 'button' | 'submit'
  style?: 'purple' | 'coral' | 'neutral'
  size?: 'small' | 'big'
  icon: string
  text: string
  disabled?: boolean
  className?: string
  onClick?: () => void
}) {
  return (
    <div
      className={`border ${(() => {
        switch (size) {
          case 'small':
            return 'p-1'
          case 'big':
            return 'text-lg py-1.5'
        }
      })()} ${(() => {
        switch (style) {
          case 'neutral':
            return `${ disabled ? 'text-wrench-neutral-3' : 'border-wrench-neutral-2 text-wrench-neutral-white' }`
          case 'purple':
            return `border-wrench-purple-2 ${ disabled ? 'text-wrench-neutral-2 bg-wrench-purple-2' : 'bg-wrench-purple text-wrench-neutral-white' }`
          case 'coral':
            return `border-wrench-coral-2 ${ disabled ? 'text-wrench-neutral-2 bg-wrench-coral-2' : 'bg-wrench-coral text-wrench-neutral-white' }`
        }
      })()} bg-white inline-block rounded-full relative ${ !disabled && 'shadow-[inset_0_1px_0_rgba(216,191,216,0.15)]' } active:shadow-none ${className}`}
    >
      <span className="material-symbols-rounded block absolute left-2 top-[47%] -translate-y-1/2 pointer-events-none !text-[16px]">
        {icon}
      </span>
      {(() => {
        switch (type) {
          case 'link':
            return <Link href={href ?? ""} className={`${size === "big" ? "pl-9 pr-3" : "pl-7 pr-2"} whitespace-nowrap`}>{text}</Link>
          case 'button':
          case 'submit':
            return <button className={`${size === "big" ? "pl-9 pr-3" : "pl-7 pr-2"} w-full text-left`} onClick={onClick}>{text}</button>
        }
      })()}
    </div>
  )
}
