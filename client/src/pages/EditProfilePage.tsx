import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getCurrentUser, updateCurrentUserProfile } from '../services/authService'

type ProfileFormData = {
  fullName: string
  photoUrl: string
  city: string
  lifestyle: string
  friendsCount: string
  followingCount: string
  bio: string
  isPetLover: boolean
  isSmoker: boolean
  isStudent: boolean
  worksFromHome: boolean
  budgetMin: string
  budgetMax: string
  entryDate: string
  prefersFurnished: boolean
  prefersParking: boolean
  prefersElevator: boolean
  prefersBalcony: boolean
  prefersYard: boolean
  prefersPrivateBathroom: boolean
  contactPhone: string
  instagramUrl: string
  facebookUrl: string
  linkedinUrl: string
}

const initialFormData: ProfileFormData = {
  fullName: '',
  photoUrl: '',
  city: '',
  lifestyle: '',
  friendsCount: '',
  followingCount: '',
  bio: '',
  isPetLover: false,
  isSmoker: false,
  isStudent: false,
  worksFromHome: false,
  budgetMin: '',
  budgetMax: '',
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
}

function EditProfilePage() {
  const navigate = useNavigate()
  const [isReady, setIsReady] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [formData, setFormData] = useState<ProfileFormData>(initialFormData)
  const [savedMessage, setSavedMessage] = useState('')

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      setIsAuthenticated(false)
      setIsReady(true)
      return
    }

    setIsAuthenticated(true)
    setFormData({
      fullName: user.fullName,
      photoUrl: user.profile.photoUrl || '',
      city: user.profile.city || '',
      lifestyle: user.profile.lifestyle || '',
      friendsCount: String(user.profile.friendsCount || ''),
      followingCount: String(user.profile.followingCount || ''),
      bio: user.profile.bio || '',
      isPetLover: user.profile.isPetLover || false,
      isSmoker: user.profile.isSmoker || false,
      isStudent: user.profile.isStudent || false,
      worksFromHome: user.profile.worksFromHome || false,
      budgetMin: String(user.profile.budgetMin || ''),
      budgetMax: String(user.profile.budgetMax || ''),
      entryDate: user.profile.entryDate || '',
      prefersFurnished: user.profile.prefersFurnished || false,
      prefersParking: user.profile.prefersParking || false,
      prefersElevator: user.profile.prefersElevator || false,
      prefersBalcony: user.profile.prefersBalcony || false,
      prefersYard: user.profile.prefersYard || false,
      prefersPrivateBathroom: user.profile.prefersPrivateBathroom || false,
      contactPhone: user.profile.contactPhone || '',
      instagramUrl: user.profile.instagramUrl || '',
      facebookUrl: user.profile.facebookUrl || '',
      linkedinUrl: user.profile.linkedinUrl || '',
    })
    setIsReady(true)
  }, [])

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = event.target
    setSavedMessage('')
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' && event.target instanceof HTMLInputElement
          ? event.target.checked
          : value,
    }))
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const user = getCurrentUser()
    if (!user) return

    updateCurrentUserProfile({
      fullName: formData.fullName.trim(),
      profile: {
        photoUrl: formData.photoUrl.trim(),
        city: formData.city.trim(),
        lifestyle: formData.lifestyle.trim(),
        friendsCount: Number(formData.friendsCount) || 0,
        followingCount: Number(formData.followingCount) || 0,
        bio: formData.bio.trim(),
        isPetLover: formData.isPetLover,
        isSmoker: formData.isSmoker,
        isStudent: formData.isStudent,
        worksFromHome: formData.worksFromHome,
        budgetMin: Number(formData.budgetMin) || 0,
        budgetMax: Number(formData.budgetMax) || 0,
        entryDate: formData.entryDate.trim(),
        prefersFurnished: formData.prefersFurnished,
        prefersParking: formData.prefersParking,
        prefersElevator: formData.prefersElevator,
        prefersBalcony: formData.prefersBalcony,
        prefersYard: formData.prefersYard,
        prefersPrivateBathroom: formData.prefersPrivateBathroom,
        contactPhone: formData.contactPhone.trim(),
        instagramUrl: formData.instagramUrl.trim(),
        facebookUrl: formData.facebookUrl.trim(),
        linkedinUrl: formData.linkedinUrl.trim(),
        interestedApartments: user.profile.interestedApartments || [],
      },
    })
    setSavedMessage('Profile updated.')
    setTimeout(() => navigate('/profile'), 450)
  }

  if (!isReady) return null
  if (!isAuthenticated) return <Navigate to="/login" replace />

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-6 sm:py-14">
      <form
        onSubmit={handleSave}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.22)] sm:p-8"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Profile
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Edit profile
            </h1>
          </div>
          <Link
            to="/profile"
            className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700"
          >
            Back
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              Full name
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              Profile photo URL
            </label>
            <input
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              City
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Tel Aviv"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              Friends
            </label>
            <input
              name="friendsCount"
              value={formData.friendsCount}
              onChange={handleChange}
              type="number"
              min="0"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              Following
            </label>
            <input
              name="followingCount"
              value={formData.followingCount}
              onChange={handleChange}
              type="number"
              min="0"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              Lifestyle
            </label>
            <input
              name="lifestyle"
              value={formData.lifestyle}
              onChange={handleChange}
              placeholder="Quiet evenings, early riser, tidy..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              About you
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
              Lifestyle flags
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['isPetLover', 'Pet lover'],
                ['isSmoker', 'Smoker'],
                ['isStudent', 'Student'],
                ['worksFromHome', 'Work from home'],
              ].map(([name, label]) => (
                <label key={name} className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    name={name}
                    checked={Boolean(formData[name as keyof ProfileFormData])}
                    onChange={handleChange}
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              Min budget
            </label>
            <input
              name="budgetMin"
              value={formData.budgetMin}
              onChange={handleChange}
              type="number"
              min="0"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              Max budget
            </label>
            <input
              name="budgetMax"
              value={formData.budgetMax}
              onChange={handleChange}
              type="number"
              min="0"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              Entry date
            </label>
            <input
              name="entryDate"
              value={formData.entryDate}
              onChange={handleChange}
              placeholder="e.g. 2026-05-01 or Flexible"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
              Apartment amenities
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['prefersFurnished', 'Furnished'],
                ['prefersParking', 'Parking'],
                ['prefersElevator', 'Elevator'],
                ['prefersBalcony', 'Balcony'],
                ['prefersYard', 'Yard'],
                ['prefersPrivateBathroom', 'Private bathroom'],
              ].map(([name, label]) => (
                <label key={name} className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    name={name}
                    checked={Boolean(formData[name as keyof ProfileFormData])}
                    onChange={handleChange}
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              Phone number
            </label>
            <input
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="+972 ..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              Instagram URL
            </label>
            <input
              name="instagramUrl"
              value={formData.instagramUrl}
              onChange={handleChange}
              placeholder="https://instagram.com/username"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              Facebook URL
            </label>
            <input
              name="facebookUrl"
              value={formData.facebookUrl}
              onChange={handleChange}
              placeholder="https://facebook.com/username"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              LinkedIn URL
            </label>
            <input
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          {savedMessage ? <p className="text-sm text-emerald-700">{savedMessage}</p> : <span />}
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-cyan-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(8,145,178,0.5)] transition hover:brightness-110"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProfilePage
