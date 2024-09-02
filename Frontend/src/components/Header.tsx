import { Link } from "wouter";
import Button from "./Button";

export default function Header() {
  return(
    <div className="flex items-center w-full">
      <Link href="/" className="text-2xl font-semibold flex-1">wrench</Link>
      <div className="flex items-center flex-1">
        <Link href="/" className="hover:text-wrench-purple-1">Home</Link>
        <Link href="/" className="hover:text-wrench-purple-1">News</Link>
        <Link href="/" className="hover:text-wrench-purple-1">Download</Link>
      </div>
      <div className="flex items-center">
        <Link href="/" className="hover:text-wrench-purple-1"><span className="material-icons">shopping_basket</span></Link>
        <Link href="/" className="hover:text-wrench-purple-1"><span className="material-icons">notifications</span></Link>
        <Button type="button" text="Sign In" icon="login" style="purple" size="big" />
      </div>
    </div>
  )
}