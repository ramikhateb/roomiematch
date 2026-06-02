import UserAvatar from '../UserAvatar'
import type { AuthUser } from '../../types/auth'
import type { RoommateMatch } from '../../services/roommateMatchService'

export function roommateLocation(user: AuthUser) {
  return user.profile.city || user.preferences.preferredAreas || 'Area not set'
}

export function MatchScoreBadge({ score }: { score: number }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-500/20">
      {score}%
      <span className="font-medium text-emerald-600/80">match</span>
    </span>
  )
}

export function SuggestedMatchCard({ match }: { match: RoommateMatch }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:border-cyan-200/80 hover:shadow-md hover:shadow-cyan-500/5">
      <div className="flex items-center gap-3 border-b border-slate-100 bg-linear-to-r from-slate-50 to-white px-3.5 py-3">
        <UserAvatar
          fullName={match.user.fullName}
          photoUrl={match.user.profile.photoUrl}
          size="md"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-slate-900">{match.user.fullName}</h3>
          <p className="truncate text-xs text-slate-500">{roommateLocation(match.user)}</p>
        </div>
        <MatchScoreBadge score={match.score} />
      </div>
      <div className="flex flex-1 flex-wrap content-start gap-1.5 p-3">
        {match.reasons.length > 0 ? (
          match.reasons.map((reason) => (
            <span
              key={reason}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
            >
              {reason}
            </span>
          ))
        ) : (
          <span className="text-[11px] text-slate-400">Browse profile</span>
        )}
      </div>
    </article>
  )
}

export function SearchResultRow({ match }: { match: RoommateMatch }) {
  const { user } = match
  return (
    <article className="group flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-3.5 transition hover:border-slate-300 hover:bg-slate-50/50 sm:items-center sm:p-4">
      <UserAvatar fullName={user.fullName} photoUrl={user.profile.photoUrl} size="lg" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900">{user.fullName}</h3>
            <p className="text-sm text-slate-500">{roommateLocation(user)}</p>
          </div>
          <MatchScoreBadge score={match.score} />
        </div>
        <p className="text-xs text-slate-600 sm:text-sm">
          <span className="font-medium text-slate-700">₪{user.budget.toLocaleString()}</span>
          <span className="mx-1.5 text-slate-300">·</span>
          {user.preferences.sleepSchedule}
          <span className="mx-1.5 text-slate-300">·</span>
          {user.preferences.cleanliness}
        </p>
        {match.reasons.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {match.reasons.map((reason) => (
              <span
                key={`${user.id}-${reason}`}
                className="rounded-md bg-cyan-50 px-2 py-0.5 text-[10px] font-medium text-cyan-800"
              >
                {reason}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}
