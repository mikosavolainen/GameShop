import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { z } from "zod";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthenticationModalContext } from "../wrappers/AuthenticationModalWrapper";

export default function AuthForms() {
  const { modalPage } = useContext(AuthenticationModalContext)
  switch(modalPage) {
    case "signIn":
      return <LoginForm />
    case "signUp":
      return <SignUpForm />
    default:
      return <></>
  }
}


function LoginForm() {
  const { setModalPage } = useContext(AuthenticationModalContext)

  // API request function
  const loginRequest = async (formData: { username: string; password: string }) => {
    const apiUrl = import.meta.env.VITE_SERVER_BASE_API_URL; // Ensure this environment variable is correctly set
    const { data } = await axios.post(`${apiUrl}/login`, formData);
    return data;
  };

  // Validation schema
  const signInSchema = z.object({
    username: z.string().min(3, { message: "E-mail or username should be at least 3 characters long" }),
    password: z.string().min(3, { message: "Password should be at least 3 characters long" }),
  });

  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<{ username?: string; password?: string, global?: string }>({});
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // React Query mutation for POST request with proper types
  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      // Handle success (e.g., store user data, redirect)
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // Possibly redirect or update global state
      localStorage.setItem("token", data.token)
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      // Set error message state
      const message = error.response?.data?.message || 'An error occurred';
      setErrors(prev => ({ ...prev, global: message }));
    },
  });

  // Handle form submission
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Validate the form data using Zod
    const result = signInSchema.safeParse({
      username: formData.username,
      password: formData.password,
    });

    // Handle validation errors
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors({
        username: formattedErrors.username?.[0],
        password: formattedErrors.password?.[0],
      });
      return;
    }

    // Clear previous errors and trigger mutation
    setErrors({});
    mutation.mutate(formData); // Send the form data to the API
  };

  // Handle form input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h2 className="text-2xl mb-8">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          style="light"
          size="big"
          icon="person"
          label="E-mail/username"
          placeholder="Type your e-mail or username"
          value={formData.username}
          onChange={handleChange}
          required
          error={errors.username}
          outerClassName="mb-3"
        />
        <Input
          type="password"
          name="password"
          style="light"
          size="big"
          icon="key"
          label="Password"
          placeholder="Type your password"
          value={formData.password}
          onChange={handleChange}
          required
          error={errors.password}
          outerClassName="mb-4"
        />
        {errors.global && <div className="text-wrench-accent-gold">{errors.global}</div>}
        <Button type="submit" icon="login" size="big" style="purple" className="block w-full my-4" text="Sign in" />
      </form>
      <Button type="button" icon="add" size="big" style="neutral" className="block w-full" text="Sign up" onClick={() => setModalPage("signUp")} />
    </>
  );
}

function SignUpForm() {
  const { setModalPage } = useContext(AuthenticationModalContext)

  // API request function
  const registerRequest = async (formData: { username: string; password: string }) => {
    const apiUrl = import.meta.env.VITE_SERVER_BASE_API_URL; // Ensure this environment variable is correctly set
    console.log(formData)
    const { data } = await axios.post(`${apiUrl}/register`, formData);
    return data;
  };

  // Validation schema
  const signUpSchema = z.object({
    username: z.string().min(3, { message: "E-mail or username should be at least 3 characters long" }),
    password: z.string().min(3, { message: "Password should be at least 3 characters long" }),
  });

  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<{ username?: string, email?: string, phone?: string, password?: string, passwordMatch?: string, global?: string }>({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    passwordMatch: '',
  });

  // React Query mutation for POST request with proper types
  const mutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      // Handle success (e.g., store user data, redirect)
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // Possibly redirect or update global state
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      // Set error message state
      const message = error.response?.data?.message || 'An error occurred';
      setErrors(prev => ({ ...prev, global: message }));
    },
  });

  // Handle form submission
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Validate the form data using Zod
    const result = signUpSchema.safeParse({
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      passwordMatch: formData.passwordMatch,
    });

    // Handle validation errors
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors({
        username: formattedErrors.username?.[0],
        password: formattedErrors.password?.[0],
      });
      return;
    }

    // Clear previous errors and trigger mutation
    setErrors({});
    mutation.mutate(formData); // Send the form data to the API
  };

  // Handle form input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h2 className="text-2xl mb-8">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          style="light"
          size="big"
          icon="person"
          label="Username"
          placeholder="Type your username"
          value={formData.username}
          onChange={handleChange}
          required
          error={errors.username}
          outerClassName="mb-3"
        />
        <Input
          type="text"
          name="email"
          style="light"
          size="big"
          icon="person"
          label="E-mail"
          placeholder="Type your e-mail"
          value={formData.email}
          onChange={handleChange}
          required
          error={errors.email}
          outerClassName="mb-3"
        />
        <Input
          type="text"
          name="phone"
          style="light"
          size="big"
          icon="person"
          label="Phone"
          placeholder="Type your phone number"
          value={formData.phone}
          onChange={handleChange}
          required
          error={errors.phone}
          outerClassName="mb-3"
        />
        <Input
          type="password"
          name="password"
          style="light"
          size="big"
          icon="key"
          label="Password"
          placeholder="Type your password"
          value={formData.password}
          onChange={handleChange}
          required
          error={errors.password}
          outerClassName="mb-4"
        />
        <Input
          type="password"
          name="passwordMatch"
          style="light"
          size="big"
          icon="key"
          label="Confirm password"
          placeholder="Repeat your password"
          value={formData.passwordMatch}
          onChange={handleChange}
          required
          error={errors.passwordMatch}
          outerClassName="mb-4"
        />
        {errors.global && <div className="text-wrench-accent-gold">{errors.global}</div>}
        <Button type="submit" icon="login" size="big" style="purple" className="block w-full my-4" text="Sign up" />
      </form>
      <Button type="button" icon="add" size="big" style="neutral" className="block w-full" text="Sign in" onClick={() => setModalPage("signIn")} />
    </>
  );
}