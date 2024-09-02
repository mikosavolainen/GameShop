import { Link } from 'wouter'

export default function Button({
  type,
  style = 'neutral',
  size = 'small',
  icon,
  text,
  disabled,
  className
}: {
  type: 'link' | 'button' | 'submit'
  style?: 'purple' | 'coral' | 'neutral'
  size?: 'small' | 'big'
  icon: string
  text: string
  disabled?: boolean
  className?: string
}) {
  return (
    <div
      className={`${(() => {
        switch (size) {
          case 'small':
            return 'border p-1'
          case 'big':
            return 'border text-xl'
        }
      })()} ${(() => {
        switch (style) {
          case 'neutral':
            return `${ disabled ? 'text-wrench-neutral-3' : 'border-wrench-neutral-2 text-wrench-neutral-white' }`
          case 'purple':
            return `border-wrench-purple-2 ${ disabled ? 'text-wrench-neutral-2 bg-wrench-purple-2' : 'border-wrench-neutral-white bg-wrench-purple text-wrench-neutral-white' }`
          case 'coral':
            return `border-wrench-coral-2 ${ disabled ? 'text-wrench-neutral-2 bg-wrench-coral-2' : 'border-wrench-neutral-white bg-wrench-coral text-wrench-neutral-white' }`
        }
      })()} bg-white inline-block rounded-full relative ${ !disabled && 'shadow-[inset_0_1px_0_rgba(216,191,216,0.15)]' } active:shadow-none ${className}`}
    >
      <span className="material-icons block absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
        {icon}
      </span>
      {(() => {
        switch (type) {
          case 'link':
            return <Link href="https://google.com" className="pl-7 pr-2">{text}</Link>
          case 'button':
          case 'submit':
            return <button>{text}</button>
        }
      })()}
    </div>
  )
}
