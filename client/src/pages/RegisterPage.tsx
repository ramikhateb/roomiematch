import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MotionButton from '../components/motion/MotionButton'
import FormInput from '../components/FormInput'
import FormSelect from '../components/FormSelect'
import FormTextarea from '../components/FormTextarea'
import StatusCallout from '../components/StatusCallout'
import { registerUser } from '../services/authService'
import type { RegisterErrors, RegisterFormData, RegisterPayload } from '../types/auth'
import { formDataToPreferences, validateRegisterForm } from '../utils/validators'

const initialFormData: RegisterFormData = {
  fullName: '',
  email: '',
  password: '',
  budget: '',
  preferredAreas: '',
  housingSituation: '',
  sleepSchedule: '',
  cleanliness: '',
  noiseTolerance: '',
  smoking: '',
  pets: '',
  guestsComfort: '',
  lifestyleNotes: '',
}

const housingOptions = [
  { value: 'need_room', label: 'I need a room in a shared place' },
  { value: 'have_room', label: 'I have a place and need a roommate' },
  { value: 'either', label: 'Either could work for me' },
] as const

const sleepOptions = [
  { value: 'early', label: 'Early riser — quiet mornings matter' },
  { value: 'late', label: 'Night owl — I am active later' },
  { value: 'flexible', label: 'Flexible / varies' },
] as const

const cleanlinessOptions = [
  { value: 'tidy', label: 'Very tidy — surfaces clear most days' },
  { value: 'moderate', label: 'Moderate — weekly reset, lived-in ok' },
  { value: 'relaxed', label: 'Relaxed — I clean when it bothers me' },
] as const

const noiseOptions = [
  { value: 'quiet', label: 'I need a quiet home most of the time' },
  { value: 'moderate', label: 'Moderate — some music/TV is fine' },
  { value: 'social_ok', label: 'Social — occasional gatherings are ok' },
] as const

const smokingOptions = [
  { value: 'non_smoker_only', label: 'Non-smoking home only' },
  { value: 'outdoor_ok', label: 'Outdoor smoking only is ok' },
  { value: 'smoking_ok', label: 'Smoking inside is ok with me' },
] as const

const petOptions = [
  { value: 'no_pets', label: 'No pets (allergies or preference)' },
  { value: 'have_pets', label: 'I have a pet or plan to' },
  { value: 'open_to_pets', label: 'Open to a roommate with pets' },
] as const

const guestOptions = [
  { value: 'rarely', label: 'Rarely — mostly just us at home' },
  { value: 'sometimes', label: 'Sometimes — friends over now and then' },
  { value: 'often', label: 'Often — I like a more social home' },
] as const

function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<RegisterFormData>(initialFormData)
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const completionRatio = Math.round(
    (Object.values(formData).filter((value) => String(value).trim() !== '').length /
      Object.keys(formData).length) *
      100
  )

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
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
      preferences: formDataToPreferences(formData),
    }

    try {
      setIsSubmitting(true)
      setErrors({})

      const response = await registerUser(payload)

      setSuccessMessage(response.message)
      setFormData(initialFormData)
      navigate('/profile')
    } catch (error) {
      console.error('Registration failed:', error)
      setSuccessMessage(error instanceof Error ? error.message : '')
    } finally {
      setIsSubmitting(false)
    }
  }

  const sectionTitle = (title: string, subtitle: string) => (
    <div className="pt-2">
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-xs leading-relaxed text-slate-500">{subtitle}</p>
    </div>
  )

  return (
    <div className="page-shell max-w-4xl">
      <div className="relative">
        <div className="absolute -inset-1 rounded-[1.75rem] bg-linear-to-br from-cyan-500/15 via-transparent to-violet-500/15 blur-xl" />
        <div className="panel relative p-8 sm:p-9">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Set up your profile
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Account basics plus the habits and boundaries that actually decide
            whether a share works—so we can match on criteria, not just rent.
          </p>

          <div className="mt-6 panel-muted p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                Profile progress
              </p>
              <p className="text-xs font-semibold text-slate-700">{completionRatio}% complete</p>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-linear-to-r from-cyan-500 to-violet-500 transition-[width] duration-300"
                style={{ width: `${completionRatio}%` }}
              />
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            {sectionTitle(
              'Account',
              'How you sign in. Matching uses the sections below.'
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <FormInput
                  label="Full name"
                  name="fullName"
                  placeholder="Your full name"
                  value={formData.fullName}
                  error={errors.fullName}
                  onChange={handleChange}
                />
              </div>

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
                placeholder="At least 6 characters"
                value={formData.password}
                error={errors.password}
                onChange={handleChange}
              />
            </div>

            {sectionTitle(
              'Budget & area',
              'What you can pay and where you want to live.'
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <FormInput
                label="Monthly budget (you + utilities ballpark)"
                name="budget"
                type="text"
                placeholder="e.g. 4500"
                value={formData.budget}
                error={errors.budget}
                onChange={handleChange}
              />

              <div className="sm:col-span-2">
                <FormInput
                  label="Preferred neighborhoods / cities"
                  name="preferredAreas"
                  placeholder="e.g. Florentin, Jaffa — or Ramat Gan near the park"
                  value={formData.preferredAreas}
                  error={errors.preferredAreas}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2">
                <FormSelect
                  label="Your housing situation"
                  name="housingSituation"
                  value={formData.housingSituation}
                  options={[...housingOptions]}
                  error={errors.housingSituation}
                  onChange={handleChange}
                  placeholder="Where are you in the search?"
                />
              </div>
            </div>

            {sectionTitle(
              'Living preferences',
              'Honest answers here = better roommate fits.'
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <FormSelect
                label="Sleep & schedule"
                name="sleepSchedule"
                value={formData.sleepSchedule}
                options={[...sleepOptions]}
                error={errors.sleepSchedule}
                onChange={handleChange}
              />

              <FormSelect
                label="Cleanliness"
                name="cleanliness"
                value={formData.cleanliness}
                options={[...cleanlinessOptions]}
                error={errors.cleanliness}
                onChange={handleChange}
              />

              <FormSelect
                label="Noise & atmosphere"
                name="noiseTolerance"
                value={formData.noiseTolerance}
                options={[...noiseOptions]}
                error={errors.noiseTolerance}
                onChange={handleChange}
              />

              <FormSelect
                label="Smoking"
                name="smoking"
                value={formData.smoking}
                options={[...smokingOptions]}
                error={errors.smoking}
                onChange={handleChange}
              />

              <FormSelect
                label="Pets"
                name="pets"
                value={formData.pets}
                options={[...petOptions]}
                error={errors.pets}
                onChange={handleChange}
              />

              <FormSelect
                label="Guests & social rhythm"
                name="guestsComfort"
                value={formData.guestsComfort}
                options={[...guestOptions]}
                error={errors.guestsComfort}
                onChange={handleChange}
              />

              <div className="sm:col-span-2">
                <FormTextarea
                  label="Anything else we should know? (optional)"
                  name="lifestyleNotes"
                  placeholder="Allergies, WFH needs, Kosher kitchen, practice times, deal-breakers…"
                  value={formData.lifestyleNotes}
                  error={errors.lifestyleNotes}
                  onChange={handleChange}
                  hint="Short is fine — this helps explain context your clicks cannot."
                />
              </div>
            </div>

            <div className="sticky bottom-4 z-10 rounded-2xl border border-slate-200 bg-white/95 p-3 backdrop-blur">
              <MotionButton
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-55"
              >
                {isSubmitting ? 'Saving your profile…' : 'Create account'}
              </MotionButton>
            </div>
          </form>

          {successMessage ? (
            <div className="mt-5">
              <StatusCallout tone="success">{successMessage}</StatusCallout>
            </div>
          ) : null}

          <p className="mt-6 text-center text-sm text-slate-500">
            Already registered?{' '}
            <Link
              to="/login"
              className="font-semibold text-cyan-700 underline-offset-4 hover:text-cyan-700 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
