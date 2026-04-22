import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ApartmentCard from '../components/apartments/ApartmentCard'
import ApartmentFilters from '../components/apartments/ApartmentFilters'
import ApartmentMap from '../components/apartments/ApartmentMap'
import ErrorBoundary from '../components/ErrorBoundary'
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

const demoApartments: Apartment[] = [
  {
    id: 'demo-1',
    title: 'Sunny 3BR near Rothschild',
    description: 'Bright renovated apartment with balcony and elevator.',
    price: 6200,
    city: 'Tel Aviv',
    address: 'Rothschild Blvd 89',
    latitude: 32.0669,
    longitude: 34.7773,
    rooms: 3,
    floor: 3,
    sizeSqm: 82,
    quality: 'renovated',
    isFurnished: true,
    hasParking: false,
    hasElevator: true,
    hasBalcony: true,
    imageUrl:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    title: 'Quiet apartment by Yarkon Park',
    description: 'Great for early risers and remote workers.',
    price: 5400,
    city: 'Ramat Gan',
    address: 'Bialik St 14',
    latitude: 32.0876,
    longitude: 34.8142,
    rooms: 2,
    floor: 2,
    sizeSqm: 64,
    quality: 'new',
    isFurnished: false,
    hasParking: true,
    hasElevator: true,
    hasBalcony: false,
    imageUrl:
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    title: 'Modern shared flat in Florentin',
    description: 'Open kitchen, social vibe, and lots of natural light.',
    price: 4800,
    city: 'Tel Aviv',
    address: 'Abarbanel St 33',
    latitude: 32.0569,
    longitude: 34.7671,
    rooms: 2,
    floor: 1,
    sizeSqm: 58,
    quality: 'old',
    isFurnished: true,
    hasParking: false,
    hasElevator: false,
    hasBalcony: true,
    imageUrl:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-4',
    title: 'Spacious 4-room in Givatayim',
    description: 'Large living room with parking and elevator access.',
    price: 7100,
    city: 'Givatayim',
    address: 'Katzenelson St 101',
    latitude: 32.0739,
    longitude: 34.8111,
    rooms: 4,
    floor: 5,
    sizeSqm: 105,
    quality: 'luxury',
    isFurnished: false,
    hasParking: true,
    hasElevator: true,
    hasBalcony: true,
    imageUrl:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

function filterDemoApartments(filters: ApartmentFiltersType): Apartment[] {
  const min = filters.minPrice.trim() ? Number(filters.minPrice) : null
  const max = filters.maxPrice.trim() ? Number(filters.maxPrice) : null
  const rooms = filters.rooms.trim() ? Number(filters.rooms) : null
  const city = filters.city.trim().toLowerCase()
  const search = filters.search.trim().toLowerCase()

  const normalizeCondition = (quality: string) => {
    const normalized = quality.trim().toLowerCase()
    if (normalized === 'available') return 'new'
    if (normalized === 'reserved') return 'old'
    if (normalized === 'rented') return 'renovated'
    if (normalized === 'inactive') return 'old'
    return normalized
  }

  return demoApartments.filter((apartment) => {
    if (city && !apartment.city.toLowerCase().includes(city)) return false
    if (search && !apartment.city.toLowerCase().includes(search)) return false
    if (min !== null && apartment.price < min) return false
    if (max !== null && apartment.price > max) return false
    if (rooms !== null && apartment.rooms !== rooms) return false
    if (
      filters.quality &&
      normalizeCondition(apartment.quality) !== normalizeCondition(filters.quality)
    )
      return false
    if (filters.furnished && !apartment.isFurnished) return false
    if (filters.parking && !apartment.hasParking) return false
    return true
  })
}

function ApartmentsPage() {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [filters, setFilters] = useState<ApartmentFiltersType>(initialFilters)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [selectedApartmentId, setSelectedApartmentId] = useState<string | null>(null)

  useEffect(() => {
    async function loadApartments() {
      try {
        setIsLoading(true)
        setError('')
        setInfoMessage('')

        const data = await getApartments(filters)
        if (data.length > 0) {
          setApartments(data)
          return
        }

        const demoData = filterDemoApartments(filters)
        setApartments(demoData)
        setInfoMessage('No backend results yet. Showing demo apartments.')
      } catch (err) {
        console.error(err)
        setApartments(filterDemoApartments(filters))
        setError('')
        setInfoMessage('Live server is unavailable. Showing demo apartments.')
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
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12">
      <motion.div
        className="mb-8 max-w-3xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <p className="mb-3 inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
          Listings
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem] md:leading-tight">
          Find a place that works for{' '}
          <span className="bg-linear-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
            both of you
          </span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Narrow by city, budget, and must-haves—then shortlist apartments you
          can tour together without the group-chat chaos.
        </p>
      </motion.div>

      <ApartmentFilters
        filters={filters}
        onChange={handleChange}
        onReset={handleReset}
      />

      <AnimatePresence mode="wait">
        {infoMessage ? (
          <motion.div
            key={infoMessage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] as const }}
            className="mt-6 rounded-2xl border border-cyan-500/25 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-700"
          >
            {infoMessage}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
        <p className="text-sm text-slate-500">
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
              listing is one tweak away.
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
              className="order-2 lg:order-1 lg:sticky lg:top-24"
              transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } }}
            >
              <ApartmentMap
                apartments={apartments}
                selectedApartmentId={selectedApartmentId}
                onSelectApartment={toggleSelectApartment}
              />
            </motion.div>

            <motion.div
              layout
              className="order-1 grid gap-5 md:grid-cols-2 lg:order-2"
              transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } }}
            >
              <AnimatePresence mode="popLayout">
                {apartments.map((apartment) => (
                  <ApartmentCard
                    key={apartment.id}
                    apartment={apartment}
                    isHighlighted={selectedApartmentId === apartment.id}
                    onHighlight={() => toggleSelectApartment(apartment.id)}
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
