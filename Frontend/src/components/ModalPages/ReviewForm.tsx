import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import star_icon from '../../assets/Star icon.svg'
import star_icon_golden from '../../assets/Star icon golden.svg'
import Button from '../Button'
import { ModalContext } from '../../wrappers/ModalWrapper'
import axios from 'axios'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
export default function ReviewForm() {
  const { setModalLoading, setModalOpen, modalPage } =
    useContext(ModalContext)

  // API request function
  const loginRequest = async (formData: {
    content: string
    rating: number
  }) => {
    setModalLoading(true)
    const apiUrl = import.meta.env.VITE_SERVER_BASE_API_URL // Ensure this environment variable is correctly set
    const { data } = await axios.post(`${apiUrl}/add-review`, {game_id: modalPage.split("/")[1], token: localStorage.getItem("token"), stars: rating, desc: formData.content})
    return data
  }

  // Validation schema
  const signInSchema = z.object({
    content: z
      .string()
      .min(3, {
        message: 'Content should be at least 50 characters long',
      }),
    rating: z
      .number(),
  })

  const queryClient = useQueryClient()
  const [errors, setErrors] = useState<{
    content?: string
    rating?: string
    global?: string
  }>({})
  const [formData, setFormData] = useState({
    content: '',
    rating: 0,
  })

  // React Query mutation for POST request with proper types
  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: () => {
      // Handle success (e.g., store user data, redirect)
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setModalLoading(false)
      setModalOpen(false)
    },
    onError: (error: { response?: { data?: string } }) => {
      // Set error message state
      const message = error.response?.data || 'An error occurred'
      setErrors((prev) => ({ ...prev, global: message }))
      setModalLoading(false)
    },
  })

  // Handle form submission
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    // Validate the form data using Zod
    const result = signInSchema.safeParse({
      content: formData.content,
      rating: rating,
    })

    // Handle validation errors
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors
      setErrors({
        content: formattedErrors.content?.[0],
        rating: formattedErrors.rating?.[0],
      })
      return
    }

    // Clear previous errors and trigger mutation
    setErrors({})
    mutation.mutate(formData) // Send the form data to the API
  }

  // Handle form input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const [rating, setRating] = useState(0) //0 is default you need to get thing from database

  useEffect(() => {
    handleChange
  }, [rating, handleChange])

  function StarsButton({ rating }: { rating: number }) {
    return (
      <>
        <button onClick={() => setRating(1)}>
          <img src={rating >= 1 ? star_icon_golden : star_icon} />
        </button>
        <button onClick={() => setRating(2)}>
          <img src={rating >= 2 ? star_icon_golden : star_icon} />
        </button>
        <button onClick={() => setRating(3)}>
          <img src={rating >= 3 ? star_icon_golden : star_icon} />
        </button>
        <button onClick={() => setRating(4)}>
          <img src={rating >= 4 ? star_icon_golden : star_icon} />
        </button>
        <button onClick={() => setRating(5)}>
          <img src={rating >= 5 ? star_icon_golden : star_icon} />
        </button>
      </>
    )
  }
  return (
    <>
      <h2 className="text-2xl mb-4">Review</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className={`bg-wrench-neutral-white w-full min-h-8 text-wrench-neutral-dark outline-none p-1 border border-wrench-neutral-3 focus:border-wrench-neutral-2`}
          maxLength={250}
          rows={5}
          placeholder={'Write your review'}
          name="content"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData((old) => ({ ...old, content: e.target.value }))}
          value={formData.content}
        />
        {errors.content && <p className="text-wrench-accent-gold mt-1">{errors.content}</p>}
        <div className="flex">
          <StarsButton rating={rating} />
          {errors.rating && <p className="text-wrench-accent-gold mt-1">{errors.rating}</p>}
        </div>
        <div className="flex">
          <Button
            className="mt-5 mr-2"
            size="big"
            style="purple"
            type="button"
            text="Submit"
            icon="send"
          />
        </div>
        {errors.global && <p className="text-wrench-accent-gold mt-1">{errors.global}</p>}
      </form>
    </>
  )
}
