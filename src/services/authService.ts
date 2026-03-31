import type { RegisterPayload } from '../types/auth'

export async function registerUser(payload: RegisterPayload) {
  console.log('Register payload sent to server:', payload)

  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    message: 'User registered successfully',
    user: {
      id: crypto.randomUUID(),
      ...payload,
    },
  }
}