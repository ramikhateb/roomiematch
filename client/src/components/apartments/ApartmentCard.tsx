import type { Apartment } from '../../types/apartment'
import { getCurrentUser, toggleInterestedApartment } from '../../services/authService'
import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { BedDouble, Building2, Car, Heart, Sofa } from 'lucide-react'

type ApartmentCardProps = {
  apartment: Apartment
  isHighlighted?: boolean
  onHighlight?: () => void
  onHoverChange?: (id: string | null) => void
}

const cardShadow = '0 12px 24px -20px rgba(15, 23, 42, 0.25)'
const cardShadowHover = '0 18px 30px -18px rgba(15, 23, 42, 0.32)'
const cardShadowFocused = '0 0 0 2px rgba(6, 182, 212, 0.45), 0 18px 30px -18px rgba(15, 23, 42, 0.32)'

function normalizeCondition(quality: string): string {
  const normalized = quality.trim().toLowerCase()
  if (normalized === 'available') return 'new'
  if (normalized === 'reserved') return 'old'
  if (normalized === 'rented') return 'renovated'
  if (normalized === 'inactive') return 'old'
  return normalized
}

function toConditionLabel(quality: string): string {
  const condition = normalizeCondition(quality)
  if (!condition) return 'Condition unknown'
  return condition.charAt(0).toUpperCase() + condition.slice(1)
}

function ApartmentCard({
  apartment,
  isHighlighted = false,
  onHighlight,
  onHoverChange,
}: ApartmentCardProps) {
  const reduce = useReducedMotion()
  const safeId = String(apartment.id ?? '')
  const safePrice = Number(apartment.price) || 0
  const safeRooms = Number(apartment.rooms) || 0
  const conditionLabel = toConditionLabel(String(apartment.quality || ''))
  const currentUser = useMemo(() => getCurrentUser(), [])
  const initiallySaved =
    currentUser?.profile.interestedApartments?.some((item) => item.id === safeId) ||
    false
  const [isSaved, setIsSaved] = useState(initiallySaved)

  const imageSrc =
    apartment.imageUrl ||
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
  const featureItems = [
    { id: 'rooms', label: `${safeRooms} rooms`, icon: BedDouble },
    { id: 'parking', label: apartment.hasParking ? 'Parking' : 'No parking', icon: Car },
    {
      id: 'furnished',
      label: apartment.isFurnished ? 'Furnished' : 'Unfurnished',
      icon: Sofa,
    },
  ] as const

  function handleToggleSave() {
    try {
      const result = toggleInterestedApartment({
        id: safeId,
        title: apartment.title,
        city: apartment.city,
        price: safePrice,
        imageUrl: apartment.imageUrl,
      })
      setIsSaved(result.saved)
    } catch {
      alert('Please sign in to save apartments.')
    }
  }

  function handleCardBackgroundClick(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement
    if (target.closest('button, a')) return
    onHighlight?.()
  }

  const baseShadow = isHighlighted ? cardShadowFocused : cardShadow

  return (
    <motion.article
      layout
      layoutId={`apartment-card-${safeId}`}
      data-apartment-id={safeId}
      initial={{ opacity: 0, y: reduce ? 0 : 18 }}
      animate={{
        opacity: 1,
        y: 0,
        boxShadow: baseShadow,
        scale: isHighlighted && !reduce ? 1.01 : 1,
      }}
      exit={{ opacity: 0, y: reduce ? 0 : -12, scale: reduce ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      whileHover={
        reduce
          ? undefined
          : {
              scale: isHighlighted ? 1.02 : 1.03,
              y: -4,
              boxShadow: isHighlighted ? cardShadowFocused : cardShadowHover,
            }
      }
      onClick={handleCardBackgroundClick}
      onMouseEnter={() => onHoverChange?.(safeId)}
      onMouseLeave={() => onHoverChange?.(null)}
      onFocus={() => onHoverChange?.(safeId)}
      onBlur={() => onHoverChange?.(null)}
      role={onHighlight ? 'button' : undefined}
      tabIndex={onHighlight ? 0 : undefined}
      onKeyDown={
        onHighlight
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onHighlight()
              }
            }
          : undefined
      }
      className={`group cursor-pointer overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
        isHighlighted
          ? 'border-cyan-500'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative shrink-0 sm:w-52">
          <motion.img
            src={imageSrc}
            alt={apartment.title}
            className="h-44 w-full object-cover sm:h-full"
            loading="lazy"
            animate={{ scale: isHighlighted && !reduce ? 1.02 : 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
          />
          <span className="absolute left-2.5 top-2.5 rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-700">
            {conditionLabel}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="line-clamp-1 text-base font-bold tracking-tight text-slate-900">
                {apartment.title}
              </h3>
              <p className="mt-1 line-clamp-1 text-sm text-slate-600">
                {apartment.address}, {apartment.city}
              </p>
            </div>
            <motion.button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                handleToggleSave()
              }}
              aria-label={isSaved ? 'Remove from favorites' : 'Add to favorites'}
              whileTap={reduce ? undefined : { scale: 0.92 }}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
                isSaved
                  ? 'border-rose-300 bg-rose-50 text-rose-500'
                  : 'border-slate-300 bg-white text-slate-500 hover:text-slate-800'
              }`}
            >
              <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
            </motion.button>
          </div>

          <p className="text-2xl font-extrabold text-slate-900">
            ₪{safePrice.toLocaleString()}
            <span className="ml-1 text-xs font-semibold text-slate-500">/ month</span>
          </p>

          <div className="grid grid-cols-3 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2.5">
          {featureItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-center"
              >
                <Icon className="mx-auto h-3.5 w-3.5 text-cyan-700" />
                <p className="mt-1 text-[11px] font-medium text-slate-700">{item.label}</p>
              </div>
            )
          })}
          </div>

          <div className="flex flex-wrap gap-2">
            {apartment.sizeSqm ? (
              <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
                {apartment.sizeSqm} m²
              </span>
            ) : null}
            {apartment.floor !== null && apartment.floor !== undefined ? (
              <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
                Floor {apartment.floor}
              </span>
            ) : null}
            {apartment.hasElevator && (
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
                <Building2 className="h-3 w-3" />
                Elevator
              </span>
            )}
            {apartment.isFurnished && (
              <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
                Furnished
              </span>
            )}

            {apartment.hasParking && (
              <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
                Parking
              </span>
            )}

            {apartment.hasBalcony && (
              <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
                Balcony
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default ApartmentCard
