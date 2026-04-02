import { useEffect, useState } from 'react'
import ApartmentCard from '../components/apartments/ApartmentCard'
import ApartmentFilters from '../components/apartments/ApartmentFilters'
import { getApartments } from '../services/apartmentService'
import type { Apartment, ApartmentFilters as ApartmentFiltersType } from '../types/apartment'

const initialFilters: ApartmentFiltersType = {
  city: '',
  minPrice: '',
  maxPrice: '',
  rooms: '',
  status: '',
  furnished: false,
  parking: false,
  search: '',
}

function ApartmentsPage() {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [filters, setFilters] = useState<ApartmentFiltersType>(initialFilters)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadApartments() {
      try {
        setIsLoading(true)
        setError('')

        const data = await getApartments(filters)
        setApartments(data)
      } catch (err) {
        console.error(err)
        setError('We could not load listings. Try again in a moment.')
      } finally {
        setIsLoading(false)
      }
    }

    loadApartments()
  }, [filters])

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = event.target

    if (type === 'checkbox') {
      const checked = (event.target as HTMLInputElement).checked

      setFilters((prev) => ({
        ...prev,
        [name]: checked,
      }))
      return
    }

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleReset() {
    setFilters(initialFilters)
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12">
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
          Listings
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-tight">
          Find a place that works for{' '}
          <span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
            both of you
          </span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Narrow by city, budget, and must-haves—then shortlist apartments you
          can tour together without the group-chat chaos.
        </p>
      </div>

      <ApartmentFilters
        filters={filters}
        onChange={handleChange}
        onReset={handleReset}
      />

      <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-6">
        <p className="text-sm text-zinc-500">
          {isLoading
            ? 'Loading listings…'
            : `${apartments.length} ${apartments.length === 1 ? 'listing' : 'listings'} match`}
        </p>
      </div>

      {error ? (
        <div className="mt-6 rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[430px] animate-pulse rounded-[1.75rem] border border-white/[0.06] bg-white/[0.03]"
            />
          ))}
        </div>
      ) : apartments.length === 0 ? (
        <div className="mt-8 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.02] px-8 py-14 text-center">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Nothing turned up yet
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-zinc-400">
            Loosen a filter or try a nearby neighborhood—sometimes the right
            listing is one tweak away.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {apartments.map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ApartmentsPage
