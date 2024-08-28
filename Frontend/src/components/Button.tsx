import { Link } from "wouter"

export default function Button({type, style, size, icon}: {type: "link" | "button" | "submit", style: "purple" | "coral", size: "small" | "big", icon: string}) {
  return(
    <div>
      {(() => {
        switch(type){
          case "link":
            return <Link href="https://google.com">Something</Link>
          case "button":
          case "submit":
            return <button>Something</button>
        }
      })()}
    </div>
  )
}