import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ApartmentCard from '../components/apartments/ApartmentCard'
import ApartmentFilters from '../components/apartments/ApartmentFilters'
import ApartmentMap from '../components/apartments/ApartmentMap'
import ErrorBoundary from '../components/ErrorBoundary'
import PageHeader from '../components/PageHeader'
import StatusCallout from '../components/StatusCallout'
import { getApartments } from '../services/apartmentService'
import type { Apartment, ApartmentFilters as ApartmentFiltersType } from '../types/apartment'

const initialFilters: ApartmentFiltersType = {
  city: '',
  minPrice: '',
  maxPrice: '',
  rooms: '',
  quality: '',
  furnished: false,
  parking: false,
  search: '',
}

function ApartmentsPage() {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [filters, setFilters] = useState<ApartmentFiltersType>(initialFilters)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedApartmentId, setSelectedApartmentId] = useState<string | null>(null)
  const [hoveredApartmentId, setHoveredApartmentId] = useState<string | null>(null)

  useEffect(() => {
    async function loadApartments() {
      try {
        setIsLoading(true)
        setError('')
        setApartments(await getApartments(filters))
      } catch (err) {
        console.error(err)
        setApartments([])
        setError('Could not load apartments from server. Check API/DB connection and try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadApartments()
  }, [filters])

  useEffect(() => {
    setSelectedApartmentId((prev) =>
      prev && apartments.some((a) => a.id === prev) ? prev : null
    )
  }, [apartments])

  useEffect(() => {
    if (!selectedApartmentId) return
    const card = document.querySelector<HTMLElement>(
      `[data-apartment-id="${selectedApartmentId}"]`
    )
    if (!card) return
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [selectedApartmentId])

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

  function toggleSelectApartment(id: string | null) {
    if (id === null) {
      setSelectedApartmentId(null)
      return
    }
    setSelectedApartmentId((current) => (current === id ? null : id))
  }

  return (
    <div className="page-shell max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <PageHeader
          eyebrow="Apartments"
          title="Find a place that works for"
          accent="both of you"
          subtitle="Narrow by city, budget, and must-haves, then shortlist apartments you can tour together without group-chat chaos."
        />
      </motion.div>

      <ApartmentFilters
        filters={filters}
        onChange={handleChange}
        onReset={handleReset}
      />

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <article className="panel-muted p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Find roommates by preferences
            </h2>
            <span className="rounded-full border border-cyan-300/50 bg-cyan-100 px-2 py-0.5 text-[11px] font-semibold text-cyan-800">
              UI preview
            </span>
          </div>
          <p className="text-sm text-slate-600">
            This panel will connect to roommate filters (schedule, cleanliness,
            smoking, pets, budget overlap) in the next backend phase.
          </p>
        </article>
        <article className="panel-muted p-5">
          <h2 className="mb-3 text-sm font-semibold text-slate-900">
            Top roommate matches
          </h2>
          <div className="space-y-2">
            {[
              { name: 'Noa Levi', fit: '92% fit' },
              { name: 'Lior Azulay', fit: '88% fit' },
            ].map((candidate) => (
              <div key={candidate.name} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2">
                <p className="text-sm font-medium text-slate-800">{candidate.name}</p>
                <span className="text-xs font-semibold text-emerald-700">{candidate.fit}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
        <p className="text-sm text-slate-500">
          {isLoading
            ? 'Loading apartments…'
            : `${apartments.length} ${apartments.length === 1 ? 'apartment' : 'apartments'} match`}
        </p>
      </div>

      {error ? (
        <div className="mt-6">
          <StatusCallout tone="error">{error}</StatusCallout>
        </div>
      ) : null}

      <ErrorBoundary>
        {isLoading ? (
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="order-2 h-[380px] animate-pulse rounded-[1.75rem] border border-slate-200 bg-white lg:order-1 lg:sticky lg:top-24" />
            <div className="order-1 grid gap-5 md:grid-cols-2 lg:order-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[430px] animate-pulse rounded-[1.75rem] border border-slate-200 bg-white"
                />
              ))}
            </div>
          </div>
        ) : apartments.length === 0 ? (
          <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-50 px-8 py-14 text-center">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Nothing turned up yet
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-slate-600">
              Loosen a filter or try a nearby neighborhood—sometimes the right
              apartment is one tweak away.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="mt-8 grid gap-5 lg:grid-cols-2 lg:items-start"
            transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } }}
          >
            <motion.div
              layout
              className="order-2 lg:order-2 lg:sticky lg:top-24"
              transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } }}
            >
              <ApartmentMap
                apartments={apartments}
                selectedApartmentId={selectedApartmentId}
                highlightedApartmentId={hoveredApartmentId}
                onSelectApartment={toggleSelectApartment}
              />
            </motion.div>

            <motion.div
              layout
              className="order-1 grid gap-5 md:grid-cols-2 lg:order-1"
              transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } }}
            >
              <AnimatePresence mode="popLayout">
                {apartments.map((apartment) => (
                  <ApartmentCard
                    key={apartment.id}
                    apartment={apartment}
                    isHighlighted={selectedApartmentId === apartment.id}
                    onHighlight={() => toggleSelectApartment(apartment.id)}
                    onHoverChange={setHoveredApartmentId}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </ErrorBoundary>
    </div>
  )
}

export default ApartmentsPage
