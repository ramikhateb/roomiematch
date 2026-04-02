import type { RegisterPayload } from '../types/auth'

export async function registerUser(payload: RegisterPayload) {
  const { password: _, ...safePayload } = payload
  console.log('Register payload sent to server:', safePayload)

  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    message: 'You are in — we saved your profile and matching preferences.',
    user: {
      id: crypto.randomUUID(),
      fullName: payload.fullName,
      email: payload.email,
      budget: payload.budget,
      preferences: payload.preferences,
    },
  }
}
