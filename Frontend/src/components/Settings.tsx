import { Link } from "wouter"
import Footer from "./Parts/Footer"
import Input from "./Input"
import Button from "./Button"

const Settings = () => {
  return (
    <div className="content-layout-margin mb-16 md:mb-0 md:mt-16 pt-16">
      <div className="flex gap-16 items-start">
        <div className="bg-wrench-neutral-dark border border-wrench-neutral-3 rounded-3xl p-6 flex flex-col">
          <Link href="/">Profile</Link>
          <Link href="/">Idk what other pages to put here</Link>
        </div>
        <div className="grow">
          <h2 className="font-semibold text-2xl mb-4">E-mail</h2>
          <div className="mb-4">
            <Input placeholder="E-mail" icon="email" style="dark" size="big" type="email" label="E-mail" outerClassName="inline-block" />
          </div>
          <Button icon="open_in_new" text="Change e-mail" size="small" style="purple" type="button" />
          <h2 className="font-semibold text-2xl mb-4 mt-6">Phone</h2>
          <div className="mb-4">
            <Input placeholder="Phone" icon="phone" style="dark" size="big" type="text" label="Phone" outerClassName="inline-block" />
          </div>
          <Button icon="open_in_new" text="Change phone" size="small" style="purple" type="button" />
          <h2 className="font-semibold text-2xl mb-4 mt-6">Password</h2>
          <Button icon="open_in_new" text="Change password" size="small" style="purple" type="button" />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Settings