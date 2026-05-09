import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import FormInput from '../components/FormInput'
import FormSelect from '../components/FormSelect'
import MotionButton from '../components/motion/MotionButton'
import PageHeader from '../components/PageHeader'
import StatusCallout from '../components/StatusCallout'
import { getCurrentUser, listRegisteredUsers } from '../services/authService'
import {
  findRoommates,
  suggestedRoommates,
  type RoommateSearchFilters,
} from '../services/roommateMatchService'

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
  const allUsers = useMemo(() => listRegisteredUsers(), [])
  const candidateUsers = useMemo(
    () => allUsers.filter((user) => user.id !== currentUser?.id),
    [allUsers, currentUser?.id]
  )
  const [draftFilters, setDraftFilters] = useState<RoommateSearchFilters>(defaultFilters)
  const [activeFilters, setActiveFilters] = useState<RoommateSearchFilters>(defaultFilters)

  const matches = useMemo(() => {
    if (!currentUser) return []
    return findRoommates(currentUser, candidateUsers, activeFilters)
  }, [activeFilters, candidateUsers, currentUser])

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
      {
        value: String(candidateUsers.length),
        label: 'Roommate profiles',
        hint: 'Available in your discovery feed',
      },
      {
        value: String(matches.length),
        label: 'Filtered matches',
        hint: 'Based on your active search filters',
      },
      {
        value: String(savedApartments),
        label: 'Saved apartments',
        hint: 'Shortlisted for comparison',
      },
      {
        value: `${profileScore}%`,
        label: 'Profile quality',
        hint: 'Higher quality improves suggestions',
      },
    ]
  }, [candidateUsers.length, currentUser, matches.length])

  function handleFilterChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target
    setDraftFilters((prev) => ({ ...prev, [name]: value }))
  }

  function handleSearch() {
    setActiveFilters({ ...draftFilters })
  }

  function handleReset() {
    setDraftFilters(defaultFilters)
    setActiveFilters(defaultFilters)
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

  return (
    <div className="page-shell max-w-7xl">
      <PageHeader
        eyebrow="Dashboard"
        title="Welcome back,"
        accent={currentUser.fullName.split(' ')[0]}
        subtitle="Discover roommates with preference filters and compatibility scoring, just like modern listing platforms."
      />

      <section className="mb-8 grid gap-3 sm:mb-10 sm:grid-cols-2 xl:grid-cols-4" aria-label="Overview">
        {stats.map((stat) => (
          <div key={stat.label} className="panel-muted px-5 py-4 transition hover:border-slate-300">
            <p className="text-2xl font-bold tabular-nums tracking-tight text-slate-900">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-700">{stat.label}</p>
            <p className="mt-1 text-xs text-slate-500">{stat.hint}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-12" aria-label="Roommate discovery">
        <div className="panel lg:col-span-4">
          <div className="p-6">
            <h2 className="text-lg font-bold text-slate-900">Roommate search</h2>
            <p className="mt-1 text-sm text-slate-600">
              Filter people by preferences and budget, then press search.
            </p>
            <div className="mt-5 grid gap-4">
              <FormInput
                label="Search by name, city, notes"
                name="query"
                value={draftFilters.query}
                placeholder="e.g. tidy in Tel Aviv"
                onChange={handleFilterChange}
              />
              <FormInput
                label="Preferred area"
                name="area"
                value={draftFilters.area}
                placeholder="e.g. Ramat Gan"
                onChange={handleFilterChange}
              />
              <FormInput
                label="Max budget"
                name="maxBudget"
                value={draftFilters.maxBudget}
                placeholder="e.g. 7500"
                onChange={handleFilterChange}
              />
              <FormSelect
                label="Sleep schedule"
                name="sleepSchedule"
                value={draftFilters.sleepSchedule}
                options={[...sleepOptions]}
                placeholder="Any schedule"
                onChange={handleFilterChange}
              />
              <FormSelect
                label="Cleanliness"
                name="cleanliness"
                value={draftFilters.cleanliness}
                options={[...cleanlinessOptions]}
                placeholder="Any level"
                onChange={handleFilterChange}
              />
              <FormSelect
                label="Smoking"
                name="smoking"
                value={draftFilters.smoking}
                options={[...smokingOptions]}
                placeholder="Any preference"
                onChange={handleFilterChange}
              />
              <FormSelect
                label="Pets"
                name="pets"
                value={draftFilters.pets}
                options={[...petOptions]}
                placeholder="Any pet preference"
                onChange={handleFilterChange}
              />
              <FormSelect
                label="Housing situation"
                name="housingSituation"
                value={draftFilters.housingSituation}
                options={[...housingOptions]}
                placeholder="Any situation"
                onChange={handleFilterChange}
              />
            </div>

            <div className="mt-5 flex gap-2.5">
              <MotionButton type="button" className="flex-1" onClick={handleSearch}>
                Search roommates
              </MotionButton>
              <MotionButton type="button" variant="outline" onClick={handleReset}>
                Reset
              </MotionButton>
            </div>
          </div>
        </div>

        <div className="space-y-5 lg:col-span-8">
          <div className="panel p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Suggested roommates</h2>
                <p className="text-sm text-slate-600">
                  Ranked by compatibility with your profile and preferences.
                </p>
              </div>
              <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800">
                {topSuggested.length} top picks
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {topSuggested.map((match) => (
                <article key={match.user.id} className="panel-muted p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{match.user.fullName}</h3>
                      <p className="mt-1 text-xs text-slate-600">
                        {match.user.profile.city || match.user.preferences.preferredAreas || 'Area not set'}
                      </p>
                    </div>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      {match.score}% fit
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {match.reasons.map((reason) => (
                      <span
                        key={reason}
                        className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] text-slate-600"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            {topSuggested.length === 0 ? (
              <p className="text-sm text-slate-500">
                No suggestions yet. Add more registered users to generate matches.
              </p>
            ) : null}
          </div>

          <div className="panel p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Search results</h2>
                <p className="text-sm text-slate-600">Live roommate directory sorted by compatibility.</p>
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                {matches.length} results
              </span>
            </div>
            <div className="grid gap-3">
              {matches.map((match) => (
                <article
                  key={match.user.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">{match.user.fullName}</h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {match.user.profile.city || match.user.preferences.preferredAreas || 'Area not set'}
                      </p>
                    </div>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      {match.score}% fit
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Budget: ₪{match.user.budget.toLocaleString()} • Sleep: {match.user.preferences.sleepSchedule} •
                    Cleanliness: {match.user.preferences.cleanliness}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {match.reasons.map((reason) => (
                      <span
                        key={`${match.user.id}-${reason}`}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            {matches.length === 0 ? (
              <StatusCallout tone="info" className="mt-4">
                No roommates matched your current filters yet. Try broadening city, budget, or lifestyle filters.
              </StatusCallout>
            ) : null}
          </div>
        </div>
      </section>

      <aside className="panel mt-8 flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center sm:p-7">
        <div>
          <p className="text-sm font-semibold text-slate-900">Ready to pair roommate + apartment?</p>
          <p className="mt-1 text-sm text-slate-500">
            Move from people search to apartment shortlist with the same budget context.
          </p>
        </div>
        <Link
          to="/apartments"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 transition hover:bg-slate-100"
        >
          Open apartments
          <svg
            className="h-4 w-4 text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </aside>
    </div>
  )
}

export default DashboardPage
