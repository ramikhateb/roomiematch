import { useState } from 'react'
import FormInput from '../components/FormInput'
import { registerUser } from '../services/authService'
import type { RegisterErrors, RegisterFormData, RegisterPayload } from '../types/auth'
import { validateRegisterForm } from '../utils/validators'

const initialFormData: RegisterFormData = {
  fullName: '',
  email: '',
  password: '',
  budget: '',
}

function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>(initialFormData)
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))

    setSuccessMessage('')
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validateRegisterForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSuccessMessage('')
      return
    }

    const payload: RegisterPayload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      budget: Number(formData.budget),
    }

    try {
      setIsSubmitting(true)
      setErrors({})

      const response = await registerUser(payload)

      setSuccessMessage(response.message)
      setFormData(initialFormData)
    } catch (error) {
      console.error('Registration failed:', error)
      setSuccessMessage('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="mb-2 text-3xl font-bold">Create Account</h1>
        <p className="mb-6 text-slate-300">
          Join RoomieMatch and start finding the right roommate.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <FormInput
            label="Full Name"
            name="fullName"
            placeholder="Your full name"
            value={formData.fullName}
            error={errors.fullName}
            onChange={handleChange}
          />

          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            error={errors.email}
            onChange={handleChange}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            error={errors.password}
            onChange={handleChange}
          />

          <FormInput
            label="Monthly Budget"
            name="budget"
            type="text"
            placeholder="e.g. 4500"
            value={formData.budget}
            error={errors.budget}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Creating account...' : 'Register'}
          </button>
        </form>

        {successMessage ? (
          <p className="mt-4 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            {successMessage}
          </p>
        ) : null}
      </div>
    </div>
  )
}

export default RegisterPage