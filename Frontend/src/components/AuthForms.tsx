import { ChangeEvent, FormEvent, useState } from "react"
import Input from "./Input"
import Button from "./Button"
import { z } from "zod"



const signInSchema = z.object({
  login: z.string().min(3, { message: "E-mail or username should be at least 3 characters long" }),
  password: z.string().min(3, { message: "Password should be at least 3 characters long" })
})

export default function AuthForms() {
  const [formState, setFormState] = useState<any>({})
  const [loginValue, setLoginValue] = useState<string>("")
  const [passwordValue, setPasswordValue] = useState<string>("")
  const [errors, setErrors] = useState<{ login?: string; password?: string }>({})

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const result = signInSchema.safeParse({
      login: loginValue,
      password: passwordValue
    })

    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors
      setErrors({
        login: formattedErrors.login?.[0],
        password: formattedErrors.password?.[0]
      })
      return
    }

    setErrors({})
  }
  return(
    <>
      <h2 className="text-2xl mb-8">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <Input type='text' style='light' size='big' icon='person' label='E-mail/username' placeholder='Type your e-mail or username' value={loginValue} onChange={(event: ChangeEvent<HTMLInputElement>) => setLoginValue(event.target.value)} required error={errors.login} outerClassName="mb-3" />
        <Input type='password' style='light' size='big' icon='key' label='Password' placeholder='Type your password' value={passwordValue} onChange={(event: ChangeEvent<HTMLInputElement>) => setPasswordValue(event.target.value)} required error={errors.password} outerClassName="mb-8" />
        <Button type="submit" icon="login" size="big" style="purple" className="block w-full mb-4" text="Sign in" />
      </form>
      <Button type="button" icon="add" size="big" style="neutral" className="block w-full" text="Sign up" />
    </>
  )
}