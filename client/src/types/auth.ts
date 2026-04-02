/** Values stored for roommate matching — keep in sync with registration form. */
export type HousingSituation = 'need_room' | 'have_room' | 'either'

export type SleepSchedule = 'early' | 'late' | 'flexible'

export type CleanlinessLevel = 'tidy' | 'moderate' | 'relaxed'

export type NoiseTolerance = 'quiet' | 'moderate' | 'social_ok'

export type SmokingPreference = 'non_smoker_only' | 'outdoor_ok' | 'smoking_ok'

export type PetSituation = 'no_pets' | 'have_pets' | 'open_to_pets'

export type GuestComfort = 'rarely' | 'sometimes' | 'often'

export type RoommatePreferences = {
  preferredAreas: string
  housingSituation: HousingSituation
  sleepSchedule: SleepSchedule
  cleanliness: CleanlinessLevel
  noiseTolerance: NoiseTolerance
  smoking: SmokingPreference
  pets: PetSituation
  guestsComfort: GuestComfort
  lifestyleNotes: string
}

export type RegisterFormData = {
  fullName: string
  email: string
  password: string
  budget: string
  preferredAreas: string
  housingSituation: string
  sleepSchedule: string
  cleanliness: string
  noiseTolerance: string
  smoking: string
  pets: string
  guestsComfort: string
  lifestyleNotes: string
}

export type RegisterErrors = Partial<Record<keyof RegisterFormData, string>>

export type RegisterPayload = {
  fullName: string
  email: string
  password: string
  budget: number
  preferences: RoommatePreferences
}
