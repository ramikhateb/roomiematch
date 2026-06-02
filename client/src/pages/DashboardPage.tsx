import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import FormInput from '../components/FormInput'
import FormSelect from '../components/FormSelect'
import MotionButton from '../components/motion/MotionButton'
import PageHeader from '../components/PageHeader'
import {
  SearchResultRow,
  SuggestedMatchCard,
} from '../components/roommate/RoommateMatchCards'
import StatusCallout from '../components/StatusCallout'
import SectionPanel from '../components/ui/SectionPanel'
import UserAvatar from '../components/UserAvatar'
import { getCurrentUser, listRegisteredUsers } from '../services/authService'
import {
  discoverRoommates,
  findRoommates,
  hasActiveSearchFilters,
  suggestedRoommates,
  type RoommateSearchFilters,
} from '../services/roommateMatchService'
import { fetchRoommateCandidates } from '../services/userService'
import type { AuthUser } from '../types/auth'

const defaultFilters: RoommateSearchFilters = {
  query: '',
  area: '',
  maxBudget: '',
  sleepSchedule: '',
  cleanliness: '',
  smoking: '',
  pets: '',
  housingSituation: '',
}

const sleepOptions = [
  { value: 'early', label: 'Early' },
  { value: 'late', label: 'Late' },
  { value: 'flexible', label: 'Flexible' },
] as const

const cleanlinessOptions = [
  { value: 'tidy', label: 'Tidy' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'relaxed', label: 'Relaxed' },
] as const

const smokingOptions = [
  { value: 'non_smoker_only', label: 'Non-smoker only' },
  { value: 'outdoor_ok', label: 'Outdoor only' },
  { value: 'smoking_ok', label: 'Smoking ok' },
] as const

const petOptions = [
  { value: 'no_pets', label: 'No pets' },
  { value: 'have_pets', label: 'Have pets' },
  { value: 'open_to_pets', label: 'Open to pets' },
] as const

const housingOptions = [
  { value: 'need_room', label: 'Needs room' },
  { value: 'have_room', label: 'Has room' },
  { value: 'either', label: 'Either' },
] as const

function DashboardPage() {
  const currentUser = useMemo(() => getCurrentUser(), [])
  const localUsers = useMemo(() => listRegisteredUsers(), [])
  const [candidateUsers, setCandidateUsers] = useState<AuthUser[]>([])
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(true)
  const [candidateError, setCandidateError] = useState('')
  const [draftFilters, setDraftFilters] = useState<RoommateSearchFilters>(defaultFilters)
  const [activeFilters, setActiveFilters] = useState<RoommateSearchFilters>(defaultFilters)
  const [hasSearched, setHasSearched] = useState(false)
  const [discoverSeed, setDiscoverSeed] = useState(() => Date.now())

  useEffect(() => {
    let cancelled = false

    async function loadCandidates() {
      try {
        setIsLoadingCandidates(true)
        setCandidateError('')
        const apiUsers = await fetchRoommateCandidates()
        if (cancelled) return

        const localEmails = new Set(localUsers.map((user) => user.email.toLowerCase()))
        const merged = [
          ...localUsers.filter((user) => user.id !== currentUser?.id),
          ...apiUsers.filter(
            (user) =>
              user.id !== currentUser?.id &&
              !localEmails.has(user.email.toLowerCase())
          ),
        ]
        setCandidateUsers(merged)
      } catch (error) {
        console.error(error)
        if (cancelled) return
        setCandidateUsers(localUsers.filter((user) => user.id !== currentUser?.id))
        setCandidateError('Could not load roommate profiles from the server.')
      } finally {
        if (!cancelled) setIsLoadingCandidates(false)
      }
    }

    loadCandidates()

    return () => {
      cancelled = true
    }
  }, [currentUser?.id, localUsers])

  const discoveryMatches = useMemo(() => {
    if (!currentUser) return []
    return discoverRoommates(currentUser, candidateUsers, discoverSeed)
  }, [candidateUsers, currentUser, discoverSeed])

  const searchMatches = useMemo(() => {
    if (!currentUser || !hasSearched) return []
    return findRoommates(currentUser, candidateUsers, activeFilters)
  }, [activeFilters, candidateUsers, currentUser, hasSearched])

  const displayMatches = hasSearched ? searchMatches : discoveryMatches

  const topSuggested = useMemo(() => {
    if (!currentUser) return []
    return suggestedRoommates(currentUser, candidateUsers, 3)
  }, [candidateUsers, currentUser])

  const stats = useMemo(() => {
    if (!currentUser) return []
    const savedApartments = currentUser.profile.interestedApartments.length
    const profileFields = [
      currentUser.profile.city,
      currentUser.profile.bio,
      currentUser.preferences.preferredAreas,
      currentUser.preferences.lifestyleNotes,
    ]
    const completed = profileFields.filter((value) => String(value).trim()).length
    const profileScore = Math.round((completed / profileFields.length) * 100)

    return [
      { value: String(candidateUsers.length), label: 'People nearby' },
      {
        value: hasSearched ? String(searchMatches.length) : String(discoveryMatches.length),
        label: hasSearched ? 'Search hits' : 'In your feed',
      },
      { value: String(savedApartments), label: 'Saved homes' },
      { value: `${profileScore}%`, label: 'Profile ready' },
    ]
  }, [
    candidateUsers.length,
    currentUser,
    discoveryMatches.length,
    hasSearched,
    searchMatches.length,
  ])

  function handleFilterChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target
    setDraftFilters((prev) => ({ ...prev, [name]: value }))
  }

  function handleSearch() {
    if (!hasActiveSearchFilters(draftFilters)) return
    setActiveFilters({ ...draftFilters })
    setHasSearched(true)
  }

  function handleReset() {
    setDraftFilters(defaultFilters)
    setActiveFilters(defaultFilters)
    setHasSearched(false)
    setDiscoverSeed(Date.now())
  }

  function handleShuffleFeed() {
    setDiscoverSeed(Date.now())
  }

  if (!currentUser) {
    return (
      <div className="page-shell max-w-4xl">
        <PageHeader
          eyebrow="Dashboard"
          title="Sign in to unlock your"
          accent="roommate dashboard"
          subtitle="Track compatible people, run preference-based search, and compare suggested roommates."
        />
        <StatusCallout tone="info">
          Please sign in first so we can show personalized roommate matches.
        </StatusCallout>
      </div>
    )
  }

  const firstName = currentUser.fullName.split(' ')[0]
  const canSearch = hasActiveSearchFilters(draftFilters)

  return (
    <div className="page-shell max-w-7xl pb-10">
      <div className="section-divider mb-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          className="mb-0"
          eyebrow="Dashboard"
          title="Welcome back,"
          accent={firstName}
          subtitle="Browse everyone in your area, then narrow with filters when you are ready."
        />
        <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm">
          <UserAvatar
            fullName={currentUser.fullName}
            photoUrl={currentUser.profile.photoUrl}
            size="md"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{currentUser.fullName}</p>
            <Link to="/profile/edit" className="text-xs font-medium text-cyan-700 hover:text-cyan-800">
              Edit profile
            </Link>
          </div>
        </div>
      </div>

      {candidateError ? (
        <div className="mb-4">
          <StatusCallout tone="error">{candidateError}</StatusCallout>
        </div>
      ) : null}

      <section className="mb-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3" aria-label="Overview">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-sm"
          >
            <p className="text-2xl font-bold tabular-nums tracking-tight text-slate-900">
              {isLoadingCandidates && stat.label === 'People nearby' ? '…' : stat.value}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-slate-700">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="grid items-start gap-4 lg:grid-cols-12 lg:gap-5" aria-label="Roommate discovery">
        <aside className="lg:col-span-4 lg:sticky lg:top-20">
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/40">
            <div className="border-b border-white/10 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-3.5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-bold text-white">Search filters</h2>
                  <p className="mt-0.5 text-[11px] text-slate-300">
                    Apply filters, then press Search
                  </p>
                </div>
                <span className="rounded-lg bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-cyan-200">
                  {candidateUsers.length}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 p-3.5">
              <FormInput
                dense
                label="Search"
                name="query"
                value={draftFilters.query}
                placeholder="Name, city, notes…"
                onChange={handleFilterChange}
              />
              <div className="grid grid-cols-2 gap-2.5">
                <FormInput
                  dense
                  label="Area"
                  name="area"
                  value={draftFilters.area}
                  placeholder="Tel Aviv"
                  onChange={handleFilterChange}
                />
                <FormInput
                  dense
                  label="Max budget"
                  name="maxBudget"
                  value={draftFilters.maxBudget}
                  placeholder="7500"
                  onChange={handleFilterChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <FormSelect
                  dense
                  label="Sleep"
                  name="sleepSchedule"
                  value={draftFilters.sleepSchedule}
                  options={[...sleepOptions]}
                  placeholder="Any"
                  onChange={handleFilterChange}
                />
                <FormSelect
                  dense
                  label="Cleanliness"
                  name="cleanliness"
                  value={draftFilters.cleanliness}
                  options={[...cleanlinessOptions]}
                  placeholder="Any"
                  onChange={handleFilterChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <FormSelect
                  dense
                  label="Smoking"
                  name="smoking"
                  value={draftFilters.smoking}
                  options={[...smokingOptions]}
                  placeholder="Any"
                  onChange={handleFilterChange}
                />
                <FormSelect
                  dense
                  label="Pets"
                  name="pets"
                  value={draftFilters.pets}
                  options={[...petOptions]}
                  placeholder="Any"
                  onChange={handleFilterChange}
                />
              </div>
              <FormSelect
                dense
                label="Housing"
                name="housingSituation"
                value={draftFilters.housingSituation}
                options={[...housingOptions]}
                placeholder="Any situation"
                onChange={handleFilterChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-slate-100 bg-slate-50/80 p-3">
              <MotionButton
                type="button"
                className="w-full py-2.5 text-sm"
                disabled={!canSearch}
                onClick={handleSearch}
              >
                Search
              </MotionButton>
              <MotionButton
                type="button"
                variant="outline"
                className="w-full py-2.5 text-sm"
                onClick={handleReset}
              >
                Reset
              </MotionButton>
            </div>
            {!canSearch ? (
              <p className="border-t border-slate-100 px-3.5 py-2 text-center text-[11px] text-slate-500">
                Add at least one filter to run a search
              </p>
            ) : null}
          </div>
        </aside>

        <div className="space-y-4 lg:col-span-8">
          <SectionPanel
            title="Top matches for you"
            subtitle="Highest compatibility based on your profile"
            badge={
              <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-xs font-semibold text-violet-700">
                {topSuggested.length}
              </span>
            }
            bodyClassName={
              topSuggested.length > 0
                ? 'grid gap-2.5 p-3.5 sm:grid-cols-3 sm:p-4'
                : 'px-4 py-6 sm:px-5'
            }
          >
            {topSuggested.length > 0 ? (
              topSuggested.map((match) => <SuggestedMatchCard key={match.user.id} match={match} />)
            ) : (
              <p className="text-center text-sm text-slate-500">
                {isLoadingCandidates ? 'Loading suggestions…' : 'No suggestions available yet.'}
              </p>
            )}
          </SectionPanel>

          <SectionPanel
            title={hasSearched ? 'Search results' : 'Discover roommates'}
            subtitle={
              hasSearched
                ? 'Filtered list based on your active criteria'
                : 'Everyone in the pool, shuffled so you can explore'
            }
            badge={
              <div className="flex items-center gap-2">
                {!hasSearched ? (
                  <button
                    type="button"
                    onClick={handleShuffleFeed}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Shuffle
                  </button>
                ) : null}
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {displayMatches.length}
                </span>
              </div>
            }
            bodyClassName={
              displayMatches.length > 0 ? 'space-y-2 p-3.5 sm:p-4' : 'p-3.5 sm:p-4'
            }
          >
            {displayMatches.length > 0 ? (
              displayMatches.map((match) => (
                <SearchResultRow key={match.user.id} match={match} />
              ))
            ) : hasSearched ? (
              <StatusCallout tone="info">
                No roommates matched your filters. Try clearing lifestyle filters or widening the area.
              </StatusCallout>
            ) : (
              <StatusCallout tone="info">
                {isLoadingCandidates
                  ? 'Loading profiles…'
                  : 'No profiles available yet. Check back after more people join.'}
              </StatusCallout>
            )}
          </SectionPanel>
        </div>
      </section>

      <aside className="section-divider mt-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-linear-to-r from-cyan-600 to-violet-600 p-px shadow-lg shadow-violet-500/10">
        <div className="flex flex-col items-start justify-between gap-4 rounded-[calc(1rem-1px)] bg-slate-900 px-5 py-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-white">Pair a roommate with an apartment</p>
            <p className="mt-1 text-xs text-slate-300">
              Jump to listings that match your shared budget and area.
            </p>
          </div>
          <Link
            to="/apartments"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Browse apartments
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </aside>
    </div>
  )
}

export default DashboardPage
