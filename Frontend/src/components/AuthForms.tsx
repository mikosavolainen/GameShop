import { ChangeEvent, FormEvent, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { z } from "zod";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// API request function
const loginRequest = async (formData: { username: string; password: string }) => {
  const apiUrl = import.meta.env.VITE_BASE_API_URL; // Ensure this environment variable is correctly set
  console.log(formData)
  const { data } = await axios.post(`${apiUrl}/login`, formData);
  return data;
};

// Validation schema
const signInSchema = z.object({
  username: z.string().min(3, { message: "E-mail or username should be at least 3 characters long" }),
  password: z.string().min(3, { message: "Password should be at least 3 characters long" }),
});

export default function AuthForms() {
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<{ username?: string; password?: string, global?: string }>({});
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // React Query mutation for POST request with proper types
  const mutation = useMutation({
    mutationFn: loginRequest,
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
      <Button type="button" icon="add" size="big" style="neutral" className="block w-full" text="Sign up" />
    </>
  );
}
