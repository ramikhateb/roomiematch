import type { Apartment } from '../../types/apartment'
import { getCurrentUser, toggleInterestedApartment } from '../../services/authService'
import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { BedDouble, Building2, CalendarDays, Car, Heart, Sofa, Star } from 'lucide-react'
import MotionButton from '../motion/MotionButton'

type ApartmentCardProps = {
  apartment: Apartment
  isHighlighted?: boolean
  onHighlight?: () => void
  onHoverChange?: (id: string | null) => void
}

const cardShadow = '0 18px 44px -24px rgba(15, 23, 42, 0.18)'
const cardShadowHover = '0 30px 65px -24px rgba(14, 116, 144, 0.32)'
const cardShadowFocused = '0 24px 60px -22px rgba(6, 182, 212, 0.42)'

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
  const reviewSeed = safeId
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const rating = (4.4 + (reviewSeed % 6) * 0.1).toFixed(1)
  const reviewCount = 14 + (reviewSeed % 38)
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
      className={`group cursor-pointer overflow-hidden rounded-[1.75rem] border bg-white transition-colors duration-300 ${
        isHighlighted
          ? 'border-cyan-500 ring-2 ring-cyan-400/50'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={imageSrc}
          alt={apartment.title}
          className="h-64 w-full object-cover"
          loading="lazy"
          animate={{ scale: isHighlighted && !reduce ? 1.03 : 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
          whileHover={reduce ? undefined : { scale: isHighlighted ? 1.04 : 1.04 }}
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-900/15 to-transparent" />

        <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
          <span
            className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-md ${
              isHighlighted
                ? 'border-cyan-300/75 bg-cyan-400/20 text-white'
                : 'border-white/30 bg-slate-950/45 text-white'
            }`}
          >
            {conditionLabel}
          </span>
        </div>

        <motion.button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            handleToggleSave()
          }}
          aria-label={isSaved ? 'Remove from favorites' : 'Add to favorites'}
          whileTap={reduce ? undefined : { scale: 0.92 }}
          className={`absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition sm:right-4 sm:top-4 ${
            isSaved
              ? 'border-rose-300/80 bg-rose-500/20 text-rose-100'
              : 'border-white/30 bg-slate-950/40 text-white hover:bg-slate-950/55'
          }`}
        >
          <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </motion.button>

        <div className="absolute bottom-3 left-3 rounded-2xl border border-white/35 bg-slate-950/50 px-3.5 py-2 text-base font-bold text-white backdrop-blur-md sm:bottom-4 sm:left-4">
          ₪{safePrice.toLocaleString()}
          <span className="ml-1 text-[11px] font-medium text-slate-200">/ mo</span>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-1.5">
          <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-slate-900">
            {apartment.title}
          </h3>
          <p className="line-clamp-1 text-sm text-slate-600">
            {apartment.address}, {apartment.city}
          </p>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
            <span className="text-xs font-semibold text-slate-800">{rating}</span>
            <span className="text-xs text-slate-500">({reviewCount} reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5">
          {featureItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-center"
              >
                <Icon className="mx-auto h-3.5 w-3.5 text-cyan-700" />
                <p className="mt-1 text-[11px] font-medium text-slate-700">{item.label}</p>
              </div>
            )
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          {apartment.sizeSqm ? (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700">
              {apartment.sizeSqm} m²
            </span>
          ) : null}
          {apartment.floor !== null && apartment.floor !== undefined ? (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700">
              Floor {apartment.floor}
            </span>
          ) : null}
          {apartment.hasElevator && (
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700">
              <Building2 className="h-3 w-3" />
              Elevator
            </span>
          )}
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

          {apartment.hasBalcony && (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700">
              Balcony
            </span>
          )}
        </div>

        <div className="flex gap-2.5 pt-1" onClick={(e) => e.stopPropagation()}>
          <MotionButton type="button" variant="primary" className="flex-1 px-4 py-3 text-sm">
            View details
          </MotionButton>
          <MotionButton type="button" variant="outline" className="px-4 py-3 text-sm">
            <CalendarDays className="mr-1.5 h-4 w-4" />
            Schedule tour
          </MotionButton>
        </div>
      </div>
    </motion.article>
  )
}

export default ApartmentCard
