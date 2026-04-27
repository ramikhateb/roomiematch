import type {
  AuthUser,
  InterestedApartment,
  LoginPayload,
  RegisterPayload,
  UserProfile,
} from '../types/auth'

type StoredUser = AuthUser & { password: string }

const USERS_KEY = 'roomiematch.users'
const SESSION_KEY = 'roomiematch.session'

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

const emptyPreferences = {
  preferredAreas: '',
  housingSituation: 'either',
  sleepSchedule: 'flexible',
  cleanliness: 'moderate',
  noiseTolerance: 'moderate',
  smoking: 'outdoor_ok',
  pets: 'open_to_pets',
  guestsComfort: 'sometimes',
  lifestyleNotes: '',
} as const

function normalizeStoredUser(user: Partial<StoredUser> & { id: string }): StoredUser {
  return {
    id: user.id,
    fullName: user.fullName || 'Roomie User',
    email: user.email || '',
    password: user.password || '',
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

function readUsers(): StoredUser[] {
  const raw = localStorage.getItem(USERS_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as Array<Partial<StoredUser> & { id: string }>
    return parsed.map(normalizeStoredUser)
  } catch (error) {
    console.error('Could not parse users store', error)
    return []
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function setSession(userId: string) {
  localStorage.setItem(SESSION_KEY, userId)
}

export function signOutUser() {
  localStorage.removeItem(SESSION_KEY)
}

export function getCurrentUser(): AuthUser | null {
  const sessionId = localStorage.getItem(SESSION_KEY)
  if (!sessionId) return null

  const user = readUsers().find((item) => item.id === sessionId)
  if (!user) return null

  const { password: _, ...safeUser } = user
  return safeUser
}

export async function registerUser(payload: RegisterPayload) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const users = readUsers()
  const existing = users.find(
    (user) => user.email.toLowerCase() === payload.email.toLowerCase()
  )
  if (existing) {
    throw new Error('An account with this email already exists')
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    fullName: payload.fullName,
    email: payload.email,
    password: payload.password,
    budget: payload.budget,
    preferences: payload.preferences,
    profile: { ...emptyProfile, city: payload.preferences.preferredAreas },
  }

  users.push(newUser)
  writeUsers(users)
  setSession(newUser.id)

  const { password: _, ...safeUser } = newUser
  return {
    message: 'You are in — your account is ready.',
    user: safeUser,
  }
}

export async function loginUser(payload: LoginPayload) {
  await new Promise((resolve) => setTimeout(resolve, 350))

  const user = readUsers().find(
    (item) =>
      item.email.toLowerCase() === payload.email.toLowerCase() &&
      item.password === payload.password
  )
  if (!user) {
    throw new Error('Invalid email or password')
  }

  setSession(user.id)
  const { password: _, ...safeUser } = user
  return { user: safeUser }
}

export function updateCurrentUserProfile(
  data: { fullName: string; profile: UserProfile }
): AuthUser {
  const sessionId = localStorage.getItem(SESSION_KEY)
  if (!sessionId) {
    throw new Error('Not authenticated')
  }

  const users = readUsers()
  const userIndex = users.findIndex((item) => item.id === sessionId)
  if (userIndex === -1) {
    throw new Error('Session user was not found')
  }

  users[userIndex] = {
    ...users[userIndex],
    fullName: data.fullName,
    profile: data.profile,
  }
  writeUsers(users)

  const { password: _, ...safeUser } = users[userIndex]
  return safeUser
}

export function toggleInterestedApartment(apartment: InterestedApartment): {
  user: AuthUser
  saved: boolean
} {
  const sessionId = localStorage.getItem(SESSION_KEY)
  if (!sessionId) {
    throw new Error('Not authenticated')
  }

  const users = readUsers()
  const userIndex = users.findIndex((item) => item.id === sessionId)
  if (userIndex === -1) {
    throw new Error('Session user was not found')
  }

  const profile = users[userIndex].profile
  const alreadySaved = profile.interestedApartments.some(
    (item) => item.id === apartment.id
  )

  const interestedApartments = alreadySaved
    ? profile.interestedApartments.filter((item) => item.id !== apartment.id)
    : [apartment, ...profile.interestedApartments]

  users[userIndex] = {
    ...users[userIndex],
    profile: {
      ...profile,
      interestedApartments,
    },
  }
  writeUsers(users)

  const { password: _, ...safeUser } = users[userIndex]
  return { user: safeUser, saved: !alreadySaved }
}
