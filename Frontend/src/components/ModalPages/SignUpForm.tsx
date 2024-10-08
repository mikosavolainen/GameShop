import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { ModalContext } from "../../wrappers/ModalWrapper";
import { z } from "zod";
import axios from "axios";
import Input from "../Input";
import Button from "../Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Checkbox from "../Checkbox";

export default function SignUpForm() {
  const { setModalPage, setModalLoading } = useContext(ModalContext)

  // API request function
  const registerRequest = async (formData: { username: string; email: string; password: string; passwordMatch: string; agree: string; newsletter: string; }) => {
    setModalLoading(true)
    const apiUrl = import.meta.env.VITE_SERVER_BASE_API_URL; // Ensure this environment variable is correctly set
    const { data } = await axios.post(`${apiUrl}/register`, formData);
    if(formData.newsletter) await axios.post(`${apiUrl}/subscribe`, formData);
    return data;
  };

  // Validation schema
  const signUpSchema = z.object({
    username: z.string().min(3, { message: "Username should be at least 3 characters long" }),
    phone: z.string().min(3, { message: "Phone should be at least 3 characters long" }),
    email: z.string().min(3, { message: "E-mail should be at least 3 characters long" }),
    password: z.string().min(8, { message: "Password should be at least 8 characters long" }),
    passwordMatch: z.string().min(3, { message: "Password does not match" }),
    agree: z.preprocess(value => value === 'on', z.boolean()),
    newsletter: z.preprocess(value => value === 'on', z.boolean())
  });

  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<{ username?: string, email?: string, phone?: string, password?: string, passwordMatch?: string, agree?: string, newsletter?: string, global?: string }>({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    passwordMatch: '',
    agree: '',
    newsletter: '',
  });

  // React Query mutation for POST request with proper types
  const mutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      // Handle success (e.g., store user data, redirect)
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // Possibly redirect or update global state
      setModalLoading(false)
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
    const result = signUpSchema.safeParse({
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      passwordMatch: formData.passwordMatch,
      agree: formData.agree,
      newsletter: formData.newsletter
    });

    // Handle validation errors
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors({
        username: formattedErrors.username?.[0],
        email: formattedErrors.email?.[0],
        phone: formattedErrors.phone?.[0],
        password: formattedErrors.password?.[0],
        passwordMatch: formattedErrors.passwordMatch?.[0],
        agree: formattedErrors.agree?.[0],
        newsletter: formattedErrors.newsletter?.[0],
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
      <h2 className="text-2xl mb-4">Sign Up</h2>
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
          icon="mail"
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
          icon="call"
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
        <Checkbox label="I agree to Terms and Conditions and Privacy Policy" id="agreeCheckbox" name="agree" className="mb-4" required />
        <Checkbox label="I would like to receive newsletter" id="newsletter" name="newsletter" className="mb-4" />
        <Button type="submit" icon="add" size="big" style="purple" className="block w-full my-4" text="Sign up" />
      </form>
      <Button type="button" icon="login" size="big" style="neutral" className="block w-full" text="Sign in" onClick={() => setModalPage("signIn")} />
    </>
  );
}