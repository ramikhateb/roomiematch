import type {
  RegisterErrors,
  RegisterFormData,
  RoommatePreferences,
} from '../types/auth'

const HOUSING = new Set(['need_room', 'have_room', 'either'])
const SLEEP = new Set(['early', 'late', 'flexible'])
const CLEAN = new Set(['tidy', 'moderate', 'relaxed'])
const NOISE = new Set(['quiet', 'moderate', 'social_ok'])
const SMOKING = new Set(['non_smoker_only', 'outdoor_ok', 'smoking_ok'])
const PETS = new Set(['no_pets', 'have_pets', 'open_to_pets'])
const GUESTS = new Set(['rarely', 'sometimes', 'often'])

export function validateRegisterForm(data: RegisterFormData): RegisterErrors {
  const errors: RegisterErrors = {}

  if (!data.fullName.trim()) {
    errors.fullName = 'Full name is required'
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters'
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!data.password.trim()) {
    errors.password = 'Password is required'
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (!data.budget.trim()) {
    errors.budget = 'Budget is required'
  } else {
    const budgetNumber = Number(data.budget)

    if (Number.isNaN(budgetNumber)) {
      errors.budget = 'Budget must be a number'
    } else if (budgetNumber <= 0) {
      errors.budget = 'Budget must be greater than 0'
    }
  }

  if (!data.preferredAreas.trim()) {
    errors.preferredAreas = 'Add at least one neighborhood or city you want'
  } else if (data.preferredAreas.trim().length < 2) {
    errors.preferredAreas = 'Please be a bit more specific about the area'
  }

  if (!data.housingSituation || !HOUSING.has(data.housingSituation)) {
    errors.housingSituation = 'Choose the option that fits you best'
  }

  if (!data.sleepSchedule || !SLEEP.has(data.sleepSchedule)) {
    errors.sleepSchedule = 'Tell us about your sleep rhythm'
  }

  if (!data.cleanliness || !CLEAN.has(data.cleanliness)) {
    errors.cleanliness = 'How do you keep things day to day?'
  }

  if (!data.noiseTolerance || !NOISE.has(data.noiseTolerance)) {
    errors.noiseTolerance = 'What level of noise feels livable?'
  }

  if (!data.smoking || !SMOKING.has(data.smoking)) {
    errors.smoking = 'Set your smoking boundary'
  }

  if (!data.pets || !PETS.has(data.pets)) {
    errors.pets = 'What is true for you with pets?'
  }

  if (!data.guestsComfort || !GUESTS.has(data.guestsComfort)) {
    errors.guestsComfort = 'How often are guests comfortable for you?'
  }

  return errors
}

export function formDataToPreferences(data: RegisterFormData): RoommatePreferences {
  return {
    preferredAreas: data.preferredAreas.trim(),
    housingSituation: data.housingSituation as RoommatePreferences['housingSituation'],
    sleepSchedule: data.sleepSchedule as RoommatePreferences['sleepSchedule'],
    cleanliness: data.cleanliness as RoommatePreferences['cleanliness'],
    noiseTolerance: data.noiseTolerance as RoommatePreferences['noiseTolerance'],
    smoking: data.smoking as RoommatePreferences['smoking'],
    pets: data.pets as RoommatePreferences['pets'],
    guestsComfort: data.guestsComfort as RoommatePreferences['guestsComfort'],
    lifestyleNotes: data.lifestyleNotes.trim(),
  }
}
