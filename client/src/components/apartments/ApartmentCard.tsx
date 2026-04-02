import type { Apartment } from '../../types/apartment'

type ApartmentCardProps = {
  apartment: Apartment
}

function ApartmentCard({ apartment }: ApartmentCardProps) {
  const imageSrc =
    apartment.imageUrl ||
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/3 shadow-[0_28px_90px_-40px_rgba(0,0,0,0.85)] backdrop-blur-sm transition duration-300 hover:border-white/15 hover:shadow-[0_32px_100px_-36px_rgba(34,211,238,0.12)]">
      <div className="relative">
        <img
          src={imageSrc}
          alt={apartment.title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />

        <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
          <span className="rounded-full border border-white/10 bg-zinc-950/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-100 backdrop-blur-md">
            {apartment.status}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 rounded-2xl border border-white/10 bg-zinc-950/75 px-3.5 py-2 text-base font-bold text-white backdrop-blur-md sm:bottom-4 sm:right-4">
          ₪{apartment.price.toLocaleString()}
          <span className="ml-1 text-[11px] font-medium text-zinc-400">/ mo</span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h3 className="line-clamp-1 text-lg font-bold text-white">
            {apartment.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-sm text-zinc-400">
            {apartment.address}, {apartment.city}
          </p>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2 rounded-xl border border-white/6 bg-zinc-950/40 p-3.5 text-sm">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
              Rooms
            </p>
            <p className="mt-0.5 font-semibold text-zinc-100">{apartment.rooms}</p>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
              Size
            </p>
            <p className="mt-0.5 font-semibold text-zinc-100">
              {apartment.sizeSqm ? `${apartment.sizeSqm} m²` : '—'}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
              Floor
            </p>
            <p className="mt-0.5 font-semibold text-zinc-100">
              {apartment.floor ?? '—'}
            </p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {apartment.isFurnished && (
            <span className="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-200">
              Furnished
            </span>
          )}

          {apartment.hasParking && (
            <span className="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-200">
              Parking
            </span>
          )}

          {apartment.hasElevator && (
            <span className="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-200">
              Elevator
            </span>
          )}

          {apartment.hasBalcony && (
            <span className="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-200">
              Balcony
            </span>
          )}
        </div>

        <div className="flex gap-2.5">
          <button
            type="button"
            className="flex-1 rounded-xl bg-linear-to-r from-cyan-400 to-violet-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:brightness-110"
          >
            View details
          </button>

          <button
            type="button"
            className="rounded-xl border border-white/12 bg-white/3 px-4 py-3 text-sm font-medium text-zinc-100 transition hover:border-white/20 hover:bg-white/6"
          >
            Save
          </button>
        </div>
      </div>
    </article>
  )
}

export default ApartmentCard
