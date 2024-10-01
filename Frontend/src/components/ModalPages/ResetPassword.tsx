import { useLocation, useSearch } from "wouter"
import Input from "../Input"
import axios from "axios";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { ModalContext } from "../../wrappers/ModalWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import Button from "../Button";

export default function ResetPassword() {
  const [, setLocation] = useLocation()

  const { setModalPage, setModalLoading } = useContext(ModalContext)

  // API request function
  const passwordReset = async (formData: { token: string, password: string, passwordRepeat: string }) => {
    setModalLoading(true)
    const apiUrl = import.meta.env.VITE_SERVER_BASE_API_URL; // Ensure this environment variable is correctly set
    const { data } = await axios.get(`${apiUrl}/reset-password`, { params: formData });
    return data;
  };

  // Validation schema
  const passwordResetSchema = z.object({
    password: z.string().min(8, { message: "Password should be at least 8 characters long" }),
    passwordRepeat: z.string(),
  }).refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords should match",
    path: ["confirm"],
  });;

  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<{ password?: string, passwordRepeat?: string, global?: string }>({});
  const [formData, setFormData] = useState({
    token: '',
    password: '',
    passwordRepeat: ''
  });

  // React Query mutation for POST request with proper types
  const mutation = useMutation({
    mutationFn: passwordReset,
    onSuccess: () => {
      // Handle success (e.g., store user data, redirect)
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setModalLoading(false)
      setModalPage("resetPasswordSuccess")
      setLocation("/")
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
      password: formData.password,
      passwordRepeat: formData.passwordRepeat,
    });

    // Handle validation errors
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors({
        password: formattedErrors.password?.[0],
        passwordRepeat: formattedErrors.passwordRepeat?.[0],
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

  const searchString = useSearch()
  
  useEffect(() => {
    setFormData(prev => ({ ...prev, token: (new URLSearchParams(searchString)).get("token") as string }))
  }, [searchString])

  return(
    <>
      <h2 className="text-2xl mb-4">Set new password</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" value={formData.token} />
        <Input
          type="password"
          name="password"
          style="light"
          size="big"
          icon="key"
          label="New password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          error={errors.password}
          outerClassName="mb-3"
        />
        <Input
          type="password"
          name="passwordRepeat"
          style="light"
          size="big"
          icon="key"
          label="Password repeat"
          placeholder="Repeat your password"
          value={formData.passwordRepeat}
          onChange={handleChange}
          required
          error={errors.passwordRepeat}
          outerClassName="mb-3"
        />
        {errors.global && <div className="text-wrench-accent-gold">{errors.global}</div>}
        <Button type="submit" icon="restart_alt" size="big" style="purple" className="block w-full mt-4" text="Reset" />
      </form>
    </>
  )
}