import type { AuthUser, RoommatePreferences, UserProfile } from '../types/auth'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:5001/api'

const emptyProfile: UserProfile = {
  photoUrl: '',
  city: '',
  lifestyle: '',
  friendsCount: 0,
  followingCount: 0,
  bio: '',
  isPetLover: false,
  isSmoker: false,
  isStudent: false,
  worksFromHome: false,
  budgetMin: 0,
  budgetMax: 0,
  entryDate: '',
  prefersFurnished: false,
  prefersParking: false,
  prefersElevator: false,
  prefersBalcony: false,
  prefersYard: false,
  prefersPrivateBathroom: false,
  contactPhone: '',
  instagramUrl: '',
  facebookUrl: '',
  linkedinUrl: '',
  interestedApartments: [],
}

const emptyPreferences: RoommatePreferences = {
  preferredAreas: '',
  housingSituation: 'either',
  sleepSchedule: 'flexible',
  cleanliness: 'moderate',
  noiseTolerance: 'moderate',
  smoking: 'outdoor_ok',
  pets: 'open_to_pets',
  guestsComfort: 'sometimes',
  lifestyleNotes: '',
}

export function normalizeAuthUser(user: Partial<AuthUser> & { id: string }): AuthUser {
  return {
    id: user.id,
    fullName: user.fullName || 'Roomie User',
    email: user.email || '',
    budget: typeof user.budget === 'number' ? user.budget : 0,
    preferences: {
      ...emptyPreferences,
      ...(user.preferences || {}),
    },
    profile: {
      ...emptyProfile,
      ...(user.profile || {}),
      interestedApartments: user.profile?.interestedApartments || [],
    },
  }
}

export async function fetchRoommateCandidates(): Promise<AuthUser[]> {
  const response = await fetch(`${API_BASE_URL}/users`)

  if (!response.ok) {
    throw new Error('Failed to fetch roommate profiles')
  }

  const data = (await response.json()) as Array<Partial<AuthUser> & { id: string }>
  return data.map(normalizeAuthUser)
}
