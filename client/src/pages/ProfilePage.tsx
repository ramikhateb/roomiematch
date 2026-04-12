import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { getCurrentUser } from '../services/authService'
import type { AuthUser } from '../types/auth'

function toSafeExternalUrl(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

function ProfilePage() {
  const [isReady, setIsReady] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      setIsAuthenticated(false)
      setIsReady(true)
      return
    }

    setIsAuthenticated(true)
    setUser(user)
    setIsReady(true)
  }, [])

  if (!isReady) return null
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!user) return null

  const previewPhoto =
    user.profile.photoUrl.trim() ||
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=320&q=80'
  const postCount = user.profile.interestedApartments.length
  const friendCount = user.profile.friendsCount || 0
  const followingCount = user.profile.followingCount || 0
  const preferenceChips = [
    ['Furnished', user.profile.prefersFurnished],
    ['Parking', user.profile.prefersParking],
    ['Elevator', user.profile.prefersElevator],
    ['Balcony', user.profile.prefersBalcony],
    ['Yard', user.profile.prefersYard],
    ['Private bathroom', user.profile.prefersPrivateBathroom],
  ] as const
  const lifestyleChips = [
    ['Pet lover', user.profile.isPetLover],
    ['Smoker', user.profile.isSmoker],
    ['Student', user.profile.isStudent],
    ['Work from home', user.profile.worksFromHome],
  ] as const
  const contacts = [
    {
      label: 'Instagram',
      icon: 'IG',
      rawValue: user.profile.instagramUrl,
      href: toSafeExternalUrl(user.profile.instagramUrl),
    },
    {
      label: 'Facebook',
      icon: 'FB',
      rawValue: user.profile.facebookUrl,
      href: toSafeExternalUrl(user.profile.facebookUrl),
    },
    {
      label: 'LinkedIn',
      icon: 'IN',
      rawValue: user.profile.linkedinUrl,
      href: toSafeExternalUrl(user.profile.linkedinUrl),
    },
  ] as const

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.22)] sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <img
            src={previewPhoto}
            alt="Profile"
            className="h-28 w-28 rounded-full border border-slate-200 object-cover shadow-sm sm:h-36 sm:w-36"
          />

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {user.fullName || 'roomie.user'}
              </h1>
              <Link
                to="/profile/edit"
                className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700"
              >
                Edit profile
              </Link>
            </div>

            <div className="mt-4 flex gap-6 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-slate-900">{postCount}</span> posts
              </p>
              <p>
                <span className="font-semibold text-slate-900">{friendCount}</span> friends
              </p>
              <p>
                <span className="font-semibold text-slate-900">{followingCount}</span>{' '}
                following
              </p>
            </div>

            <p className="mt-3 text-sm font-medium text-slate-900">
              {user.profile.city.trim() || 'Add your city'}
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600">
              {user.profile.bio.trim() ||
                'Add your bio and lifestyle so people can understand what kind of roommate you are.'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.22)]">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            Lifestyle
          </h2>
          <p className="mb-4 text-sm text-slate-600">
            {user.profile.lifestyle || user.preferences.lifestyleNotes || 'No lifestyle note yet.'}
          </p>
          <div className="flex flex-wrap gap-2">
            {lifestyleChips.map(([label, value]) => (
              <span
                key={label}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  value
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                    : 'border-slate-300 bg-slate-50 text-slate-600'
                }`}
              >
                {label}: {value ? 'Yes' : 'No'}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.22)] lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            Apartment preferences
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Budget range</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {user.profile.budgetMin || user.profile.budgetMax
                  ? `₪${user.profile.budgetMin.toLocaleString()} - ₪${user.profile.budgetMax.toLocaleString()}`
                  : `₪${user.budget.toLocaleString()} (default)`}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Entry date</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {user.profile.entryDate || 'Flexible'}
              </p>
            </div>
            <div className="sm:col-span-2 flex flex-wrap gap-2">
              {preferenceChips.map(([label, value]) => (
                <span
                  key={label}
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${
                    value
                      ? 'border-cyan-300 bg-cyan-50 text-cyan-700'
                      : 'border-slate-300 bg-slate-50 text-slate-600'
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.22)] sm:p-6">
        <div className="mb-4 border-b border-slate-200 pb-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          Contact
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((contact) =>
            contact.href ? (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 transition hover:border-cyan-200 hover:bg-cyan-50/50"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-semibold text-white">
                    {contact.icon}
                  </span>
                  <p className="font-medium">{contact.label}</p>
                </div>
                <p className="mt-2 line-clamp-1 text-xs text-slate-500">{contact.rawValue}</p>
              </a>
            ) : (
              <div
                key={contact.label}
                className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-300 px-1 text-[10px] font-semibold text-white">
                    {contact.icon}
                  </span>
                  <p className="font-medium text-slate-600">{contact.label}</p>
                </div>
                <p className="mt-2 text-xs">Not set</p>
              </div>
            )
          )}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            Phone
            <p className="mt-1 text-xs text-slate-500">{user.profile.contactPhone || 'Not set'}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.22)] sm:p-6">
        <div className="mb-4 border-b border-slate-200 pb-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          Interested apartments
        </div>
        {user.profile.interestedApartments.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            Save apartments from Listings and they will appear here.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {user.profile.interestedApartments.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <img
                  src={
                    item.imageUrl ||
                    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={item.title}
                  className="aspect-square w-full object-cover"
                />
                <div className="p-3">
                  <p className="line-clamp-1 text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.city}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-700">
                    ₪{item.price.toLocaleString()}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
