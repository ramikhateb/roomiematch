import type { Apartment } from '../../types/apartment'

type ApartmentCardProps = {
  apartment: Apartment
}

function ApartmentCard({ apartment }: ApartmentCardProps) {
  const imageSrc =
    apartment.imageUrl ||
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'

  return (
    <div className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="relative">
        <img
          src={imageSrc}
          alt={apartment.title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />

        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {apartment.status}
          </span>
        </div>

        <div className="absolute bottom-4 right-4 rounded-2xl bg-black/45 px-4 py-2 text-lg font-bold text-white backdrop-blur">
          ₪{apartment.price.toLocaleString()}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="line-clamp-1 text-xl font-bold text-white">
            {apartment.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-sm text-slate-300">
            {apartment.address}, {apartment.city}
          </p>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-3 rounded-2xl bg-slate-950/40 p-4 text-sm text-slate-200">
          <div>
            <p className="text-xs text-slate-400">Rooms</p>
            <p className="mt-1 font-semibold">{apartment.rooms}</p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Size</p>
            <p className="mt-1 font-semibold">
              {apartment.sizeSqm ? `${apartment.sizeSqm} m²` : '-'}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Floor</p>
            <p className="mt-1 font-semibold">
              {apartment.floor ?? '-'}
            </p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {apartment.isFurnished && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
              Furnished
            </span>
          )}

          {apartment.hasParking && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
              Parking
            </span>
          )}

          {apartment.hasElevator && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
              Elevator
            </span>
          )}

          {apartment.hasBalcony && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
              Balcony
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <button className="flex-1 rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:scale-[1.01]">
            View Details
          </button>

          <button className="rounded-2xl border border-white/10 px-4 py-3 text-white transition hover:bg-white/5">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApartmentCard