import type { ApartmentFilters as ApartmentFiltersType } from '../../types/apartment'

type ApartmentFiltersProps = {
  filters: ApartmentFiltersType
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onReset: () => void
}

const fieldClass =
  'rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-cyan-400/25 placeholder:text-zinc-600 focus:border-cyan-400/35 focus:ring-2'

function ApartmentFilters({
  filters,
  onChange,
  onReset,
}: ApartmentFiltersProps) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.75)] backdrop-blur-sm sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Refine your search
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Stack filters until the map matches what you actually need.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="shrink-0 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Clear all
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <input
          type="text"
          name="search"
          placeholder="Keyword or area"
          value={filters.search}
          onChange={onChange}
          className={fieldClass}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={onChange}
          className={fieldClass}
        />

        <input
          type="number"
          name="minPrice"
          placeholder="Min ₪ / month"
          value={filters.minPrice}
          onChange={onChange}
          className={fieldClass}
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max ₪ / month"
          value={filters.maxPrice}
          onChange={onChange}
          className={fieldClass}
        />

        <input
          type="number"
          name="rooms"
          placeholder="Rooms"
          value={filters.rooms}
          onChange={onChange}
          className={fieldClass}
        />

        <select
          name="status"
          value={filters.status}
          onChange={onChange}
          className={fieldClass}
        >
          <option value="">Any status</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="rented">Rented</option>
          <option value="inactive">Inactive</option>
        </select>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300">
          <input
            type="checkbox"
            name="furnished"
            checked={filters.furnished}
            onChange={onChange}
            className="size-4 rounded border-slate-300 bg-zinc-900 text-cyan-400 focus:ring-cyan-400/40"
          />
          Furnished
        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300">
          <input
            type="checkbox"
            name="parking"
            checked={filters.parking}
            onChange={onChange}
            className="size-4 rounded border-slate-300 bg-zinc-900 text-cyan-400 focus:ring-cyan-400/40"
          />
          Parking
        </label>
      </div>
    </div>
  )
}

export default ApartmentFilters
