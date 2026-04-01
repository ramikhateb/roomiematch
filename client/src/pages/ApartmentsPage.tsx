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
        setError('Failed to load apartments')
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
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="mb-3 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
            Apartment Discovery
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Discover your next apartment
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Browse modern apartment listings, apply smart filters, and find the
            right place faster.
          </p>
        </div>

        <ApartmentFilters
          filters={filters}
          onChange={handleChange}
          onReset={handleReset}
        />

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-slate-300">
            {isLoading ? 'Loading apartments...' : `${apartments.length} apartments found`}
          </p>
        </div>

        {error ? (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-300">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[430px] animate-pulse rounded-[28px] border border-white/10 bg-white/5"
              />
            ))}
          </div>
        ) : apartments.length === 0 ? (
          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-2xl font-bold">No apartments found</h2>
            <p className="mt-3 text-slate-300">
              Try changing the filters to see more results.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {apartments.map((apartment) => (
              <ApartmentCard key={apartment.id} apartment={apartment} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ApartmentsPage