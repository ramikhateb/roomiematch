import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { isApartmentInterested } from '../services/authService'
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
  const location = useLocation()
  const [savedRevision, setSavedRevision] = useState(0)
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [filters, setFilters] = useState<ApartmentFiltersType>(initialFilters)
  const [activeFilters, setActiveFilters] = useState<ApartmentFiltersType>(initialFilters)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedApartmentId, setSelectedApartmentId] = useState<string | null>(null)
  const [hoveredApartmentId, setHoveredApartmentId] = useState<string | null>(null)

  useEffect(() => {
    setSavedRevision((value) => value + 1)
  }, [location.pathname])

  useEffect(() => {
    async function loadApartments() {
      try {
        setIsLoading(true)
        setError('')
        setApartments(await getApartments(activeFilters))
      } catch (err) {
        console.error(err)
        setApartments([])
        setError('Could not load apartments from server. Check API/DB connection and try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadApartments()
  }, [activeFilters])

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
    setActiveFilters(initialFilters)
  }

  function handleSearch() {
    setActiveFilters({ ...filters })
  }

  function toggleSelectApartment(id: string | null) {
    if (id === null) {
      setSelectedApartmentId(null)
      return
    }
    setSelectedApartmentId((current) => (current === id ? null : id))
  }

  return (
    <div className="page-shell max-w-7xl pb-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <PageHeader
          className="mb-6"
          eyebrow="Apartments"
          title="Find a place that works for"
          accent="both of you"
          subtitle="Filter listings, explore the map, and save favorites to compare with your roommate."
        />
      </motion.div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-3 sm:px-5">
          <p className="text-xs font-bold text-white">Listing filters</p>
          <p className="mt-0.5 text-[11px] text-slate-300">Set criteria, then press Search</p>
        </div>
        <div className="p-4 sm:p-5">
          <ApartmentFilters
            embedded
            filters={filters}
            onChange={handleChange}
            onReset={handleReset}
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="section-divider mt-5 flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm sm:px-5">
        <p className="text-sm font-medium text-slate-700">
          {isLoading
            ? 'Loading apartments…'
            : `${apartments.length} ${apartments.length === 1 ? 'listing' : 'listings'}`}
        </p>
        <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-800">
          Map + cards
        </span>
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
            className="mt-8 grid gap-5 lg:h-[calc(100vh-220px)] lg:grid-cols-2 lg:items-start lg:overflow-hidden"
            transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } }}
          >
            <motion.div
              layout
              className="order-2 lg:order-2 lg:h-full lg:self-start lg:sticky lg:top-24"
              transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } }}
            >
              <ApartmentMap
                apartments={apartments}
                selectedApartmentId={selectedApartmentId}
                highlightedApartmentId={hoveredApartmentId}
                onSelectApartment={toggleSelectApartment}
                className="lg:h-full"
              />
            </motion.div>

            <motion.div
              layout
              className="order-1 lg:order-1 lg:h-full lg:overflow-y-auto lg:pr-1"
              transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } }}
            >
              <div className="grid gap-5">
                <AnimatePresence mode="popLayout">
                  {apartments.map((apartment) => {
                    void savedRevision
                    const interested = isApartmentInterested({
                      id: apartment.id,
                      title: apartment.title,
                      city: apartment.city,
                      price: apartment.price,
                      imageUrl: apartment.imageUrl,
                    })

                    return (
                      <ApartmentCard
                        key={apartment.id}
                        apartment={apartment}
                        isSaved={interested}
                        isHighlighted={selectedApartmentId === apartment.id}
                        onHighlight={() => toggleSelectApartment(apartment.id)}
                        onHoverChange={setHoveredApartmentId}
                        onSavedChange={() => setSavedRevision((value) => value + 1)}
                      />
                    )
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </ErrorBoundary>
    </div>
  )
}

export default ApartmentsPage
