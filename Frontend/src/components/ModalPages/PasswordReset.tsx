import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthenticationModalContext } from "../../wrappers/AuthenticationModalWrapper";
import { z } from "zod";
import axios from "axios";
import Input from "../Input";
import Button from "../Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function PasswordReset() {
  const { setModalPage, setModalLoading } = useContext(AuthenticationModalContext)

  // API request function
  const passwordResetRequest = async (formData: { email: string }) => {
    setModalLoading(true)
    const apiUrl = import.meta.env.VITE_SERVER_BASE_API_URL; // Ensure this environment variable is correctly set
    const { data } = await axios.post(`${apiUrl}/forgot-password`, formData);
    return data;
  };

  // Validation schema
  const passwordResetSchema = z.object({
    email: z.string().min(3, { message: "E-mail or username should be at least 3 characters long" }),
  });

  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<{ email?: string, global?: string }>({});
  const [formData, setFormData] = useState({
    email: ''
  });

  // React Query mutation for POST request with proper types
  const mutation = useMutation({
    mutationFn: passwordResetRequest,
    onSuccess: () => {
      // Handle success (e.g., store user data, redirect)
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setModalLoading(false)
      setModalPage("passwordResetSuccess")
    },
    onError: (error: { response?: { data?: string } }) => {
      // Set error message state
      const message = error.response?.data || 'An error occurred';
      setErrors(prev => ({ ...prev, global: message }));
      setModalLoading(false)
    },
  });

  // Handle form submission
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Validate the form data using Zod
    const result = passwordResetSchema.safeParse({
      email: formData.email,
    });

    // Handle validation errors
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: formattedErrors.email?.[0],
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
      <h2 className="text-2xl mb-4">Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="email"
          style="light"
          size="big"
          icon="person"
          label="E-mail"
          placeholder="Type your e-mail address"
          value={formData.email}
          onChange={handleChange}
          required
          error={errors.email}
          outerClassName="mb-3"
        />
        {errors.global && <div className="text-wrench-accent-gold">{errors.global}</div>}
        <Button type="submit" icon="restart_alt" size="big" style="purple" className="block w-full mt-4" text="Reset" />
      </form>
      <Button type="button" icon="login" size="big" style="neutral" className="block w-full mt-4" text="Sign in" onClick={() => setModalPage("signIn")} />
    </>
  );
}