import { Link } from "wouter";
import Button from "./Button";

export default function MobileMenu() {
  return(
    <div className="bg-wrench-neutral-dark h-full w-full fixed top-0 left-0">
      <div className="h-[calc(100vh-64px)]">
        <Link href="/" className="bg-wrench-neutral-4 border border-wrench-neutral-3 rounded-3xl m-8 block p-6">
          <div className="size-20 rounded-full bg-wrench-neutral-2 mb-8"></div>
          <div className="flex justify-between mb-4">
            <div>
              <h2 className="text-2xl">Anonymous</h2>
              {/* <span className="text-wrench-neutral-2">Something under the username</span> */}
            </div>
            {/* <button className="material-icons">logout</button> */}
          </div>
          <Button type="button" icon="login" text="Sign in" style="purple" onClick={() => alert("hi")} />
        </Link>
      </div>
    </div>
  )
}