import type { Apartment } from '../../types/apartment'
import { getCurrentUser, toggleInterestedApartment } from '../../services/authService'
import { useMemo, useState } from 'react'

type ApartmentCardProps = {
  apartment: Apartment
}

function ApartmentCard({ apartment }: ApartmentCardProps) {
  const currentUser = useMemo(() => getCurrentUser(), [])
  const initiallySaved =
    currentUser?.profile.interestedApartments?.some((item) => item.id === apartment.id) ||
    false
  const [isSaved, setIsSaved] = useState(initiallySaved)

  const imageSrc =
    apartment.imageUrl ||
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'

  function handleToggleSave() {
    try {
      const result = toggleInterestedApartment({
        id: apartment.id,
        title: apartment.title,
        city: apartment.city,
        price: apartment.price,
        imageUrl: apartment.imageUrl,
      })
      setIsSaved(result.saved)
    } catch {
      alert('Please sign in to save apartments.')
    }
  }

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_16px_40px_-24px_rgba(15,23,42,0.22)] transition duration-300 hover:border-slate-300 hover:shadow-[0_22px_48px_-24px_rgba(14,116,144,0.25)]">
      <div className="relative">
        <img
          src={imageSrc}
          alt={apartment.title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />

        <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
          <span className="rounded-full border border-slate-300 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-800 backdrop-blur-md">
            {apartment.status}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 rounded-2xl border border-slate-300 bg-white/90 px-3.5 py-2 text-base font-bold text-slate-900 backdrop-blur-md sm:bottom-4 sm:right-4">
          ₪{apartment.price.toLocaleString()}
          <span className="ml-1 text-[11px] font-medium text-slate-600">/ mo</span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
            {apartment.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-sm text-slate-600">
            {apartment.address}, {apartment.city}
          </p>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
              Rooms
            </p>
            <p className="mt-0.5 font-semibold text-slate-800">{apartment.rooms}</p>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
              Size
            </p>
            <p className="mt-0.5 font-semibold text-slate-800">
              {apartment.sizeSqm ? `${apartment.sizeSqm} m²` : '—'}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
              Floor
            </p>
            <p className="mt-0.5 font-semibold text-slate-800">
              {apartment.floor ?? '—'}
            </p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {apartment.isFurnished && (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700">
              Furnished
            </span>
          )}

          {apartment.hasParking && (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700">
              Parking
            </span>
          )}

          {apartment.hasElevator && (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700">
              Elevator
            </span>
          )}

          {apartment.hasBalcony && (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700">
              Balcony
            </span>
          )}
        </div>

        <div className="flex gap-2.5">
          <button
            type="button"
            className="flex-1 rounded-xl bg-linear-to-r from-cyan-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            View details
          </button>

          <button
            type="button"
            onClick={handleToggleSave}
            className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
              isSaved
                ? 'border-cyan-300 bg-cyan-50 text-cyan-700'
                : 'border-slate-300 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ApartmentCard
