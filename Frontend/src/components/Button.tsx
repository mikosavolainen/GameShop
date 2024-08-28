import { Link } from 'wouter'

export default function Button({
  type,
  style = 'neutral',
  size = 'small',
  icon,
  text,
}: {
  type: 'link' | 'button' | 'submit'
  style?: 'purple' | 'coral' | 'neutral'
  size?: 'small' | 'big'
  icon: string
  text: string
}) {
  return (
    <div
      className={`${(() => {
        switch (size) {
          case 'small':
            return 'border p-1'
          case 'big':
            return 'border'
        }
      })()} ${(() => {
        switch (style) {
          case 'neutral':
            return 'border-wrench-neutral-3'
          case 'purple':
            return 'text-xl'
        }
      })()} bg-white inline-block rounded-full relative`}
    >
      <span className="text-wrench-neutral-white material-icons block absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
        {icon}
      </span>
      {(() => {
        switch (type) {
          case 'link':
            return <Link href="https://google.com" className="text-wrench-neutral-white pl-7 pr-2">{text}</Link>
          case 'button':
          case 'submit':
            return <button>{text}</button>
        }
      })()}
    </div>
  )
}
