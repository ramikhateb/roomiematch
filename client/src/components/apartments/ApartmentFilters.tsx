import type { ApartmentFilters as ApartmentFiltersType } from '../../types/apartment'

type ApartmentFiltersProps = {
  filters: ApartmentFiltersType
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onReset: () => void
}

function ApartmentFilters({
  filters,
  onChange,
  onReset,
}: ApartmentFiltersProps) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Find apartments</h2>
          <p className="text-sm text-slate-300">
            Search by city, budget, rooms, and features
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/5"
        >
          Reset
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <input
          type="text"
          name="search"
          placeholder="Search city..."
          value={filters.search}
          onChange={onChange}
          className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-400"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={onChange}
          className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-400"
        />

        <input
          type="number"
          name="minPrice"
          placeholder="Min price"
          value={filters.minPrice}
          onChange={onChange}
          className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-400"
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={onChange}
          className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-400"
        />

        <input
          type="number"
          name="rooms"
          placeholder="Rooms"
          value={filters.rooms}
          onChange={onChange}
          className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-400"
        />

        <select
          name="status"
          value={filters.status}
          onChange={onChange}
          className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
        >
          <option value="">Any status</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="rented">Rented</option>
          <option value="inactive">Inactive</option>
        </select>

        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white">
          <input
            type="checkbox"
            name="furnished"
            checked={filters.furnished}
            onChange={onChange}
          />
          Furnished
        </label>

        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white">
          <input
            type="checkbox"
            name="parking"
            checked={filters.parking}
            onChange={onChange}
          />
          Parking
        </label>
      </div>
    </div>
  )
}

export default ApartmentFilters