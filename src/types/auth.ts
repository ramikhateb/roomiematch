export type RegisterFormData = {
  fullName: string
  email: string
  password: string
  budget: string
}

export type RegisterErrors = Partial<Record<keyof RegisterFormData, string>>

export type RegisterPayload = {
  fullName: string
  email: string
  password: string
  budget: number
}