import type { RegisterErrors, RegisterFormData } from '../types/auth'

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

  return errors
}