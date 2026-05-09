import type { AuthUser, RoommatePreferences } from '../types/auth'

export type RoommateSearchFilters = {
  query: string
  area: string
  maxBudget: string
  sleepSchedule: string
  cleanliness: string
  smoking: string
  pets: string
  housingSituation: string
}

export type RoommateMatch = {
  user: AuthUser
  score: number
  reasons: string[]
}

const budgetStep = 500

function includesText(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle.toLowerCase())
}

function budgetBand(value: number) {
  if (!Number.isFinite(value) || value <= 0) return 0
  return Math.round(value / budgetStep) * budgetStep
}

function comparePreference<T extends keyof RoommatePreferences>(
  current: RoommatePreferences,
  candidate: RoommatePreferences,
  key: T,
  label: string
) {
  if (current[key] === candidate[key]) {
    return { points: 15, reason: `${label} alignment` }
  }
  return { points: 0, reason: null }
}

function getCompatibility(current: AuthUser, candidate: AuthUser): RoommateMatch {
  let score = 35
  const reasons: string[] = []

  const preferenceComparisons = [
    comparePreference(current.preferences, candidate.preferences, 'sleepSchedule', 'Sleep schedule'),
    comparePreference(current.preferences, candidate.preferences, 'cleanliness', 'Cleanliness'),
    comparePreference(current.preferences, candidate.preferences, 'noiseTolerance', 'Noise style'),
    comparePreference(current.preferences, candidate.preferences, 'smoking', 'Smoking preference'),
    comparePreference(current.preferences, candidate.preferences, 'pets', 'Pet preference'),
    comparePreference(current.preferences, candidate.preferences, 'housingSituation', 'Housing goal'),
  ]

  for (const item of preferenceComparisons) {
    score += item.points
    if (item.reason) reasons.push(item.reason)
  }

  const currentArea = current.preferences.preferredAreas.trim().toLowerCase()
  const candidateArea = candidate.preferences.preferredAreas.trim().toLowerCase()
  if (currentArea && candidateArea && (includesText(currentArea, candidateArea) || includesText(candidateArea, currentArea))) {
    score += 10
    reasons.push('Area overlap')
  }

  const budgetDiff = Math.abs(budgetBand(current.budget) - budgetBand(candidate.budget))
  if (budgetDiff <= 500) {
    score += 12
    reasons.push('Budget range is very close')
  } else if (budgetDiff <= 1500) {
    score += 6
    reasons.push('Budget range is compatible')
  }

  const lifestyleA = (current.preferences.lifestyleNotes || '').toLowerCase()
  const lifestyleB = (candidate.preferences.lifestyleNotes || '').toLowerCase()
  if (lifestyleA && lifestyleB && (includesText(lifestyleA, 'wfh') === includesText(lifestyleB, 'wfh'))) {
    score += 4
  }

  score = Math.max(0, Math.min(99, score))
  return { user: candidate, score, reasons: reasons.slice(0, 3) }
}

function matchesFilters(candidate: AuthUser, filters: RoommateSearchFilters) {
  const query = filters.query.trim().toLowerCase()
  if (query) {
    const searchable = [
      candidate.fullName,
      candidate.profile.city,
      candidate.preferences.preferredAreas,
      candidate.preferences.lifestyleNotes,
    ]
      .join(' ')
      .toLowerCase()
    if (!searchable.includes(query)) return false
  }

  if (filters.area.trim()) {
    const area = filters.area.trim().toLowerCase()
    const source = `${candidate.profile.city} ${candidate.preferences.preferredAreas}`.toLowerCase()
    if (!source.includes(area)) return false
  }

  if (filters.maxBudget.trim()) {
    const max = Number(filters.maxBudget)
    if (Number.isFinite(max) && max > 0 && candidate.budget > max) return false
  }

  if (filters.sleepSchedule && candidate.preferences.sleepSchedule !== filters.sleepSchedule) return false
  if (filters.cleanliness && candidate.preferences.cleanliness !== filters.cleanliness) return false
  if (filters.smoking && candidate.preferences.smoking !== filters.smoking) return false
  if (filters.pets && candidate.preferences.pets !== filters.pets) return false
  if (filters.housingSituation && candidate.preferences.housingSituation !== filters.housingSituation) return false

  return true
}

export function findRoommates(
  currentUser: AuthUser,
  candidates: AuthUser[],
  filters: RoommateSearchFilters
): RoommateMatch[] {
  return candidates
    .filter((candidate) => candidate.id !== currentUser.id)
    .filter((candidate) => matchesFilters(candidate, filters))
    .map((candidate) => getCompatibility(currentUser, candidate))
    .sort((a, b) => b.score - a.score)
}

export function suggestedRoommates(currentUser: AuthUser, candidates: AuthUser[], limit = 4) {
  return findRoommates(currentUser, candidates, {
    query: '',
    area: '',
    maxBudget: '',
    sleepSchedule: '',
    cleanliness: '',
    smoking: '',
    pets: '',
    housingSituation: '',
  }).slice(0, limit)
}
