import type { ApartmentFilters as ApartmentFiltersType } from '../../types/apartment'
import { motion, useReducedMotion } from 'framer-motion'
import MotionButton from '../motion/MotionButton'

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
  const reduce = useReducedMotion()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.75)] backdrop-blur-sm sm:p-6"
    >
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Refine your search
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Stack filters until the map matches what you actually need.
          </p>
        </div>

        <MotionButton
          type="button"
          variant="outline"
          onClick={onReset}
          className="shrink-0 px-4 py-2.5 text-sm font-medium"
        >
          Clear all
        </MotionButton>
      </div>

      <motion.div
        layout
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        transition={{ layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } }}
      >
        <motion.input
          layout={!reduce}
          type="text"
          name="search"
          placeholder="Keyword or area"
          value={filters.search}
          onChange={onChange}
          className={fieldClass}
        />

        <motion.input
          layout={!reduce}
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={onChange}
          className={fieldClass}
        />

        <motion.input
          layout={!reduce}
          type="number"
          name="minPrice"
          placeholder="Min ₪ / month"
          value={filters.minPrice}
          onChange={onChange}
          className={fieldClass}
        />

        <motion.input
          layout={!reduce}
          type="number"
          name="maxPrice"
          placeholder="Max ₪ / month"
          value={filters.maxPrice}
          onChange={onChange}
          className={fieldClass}
        />

        <motion.input
          layout={!reduce}
          type="number"
          name="rooms"
          placeholder="Rooms"
          value={filters.rooms}
          onChange={onChange}
          className={fieldClass}
        />

        <motion.select
          layout={!reduce}
          name="quality"
          value={filters.quality}
          onChange={onChange}
          className={fieldClass}
        >
          <option value="">Any condition</option>
          <option value="old">Old</option>
          <option value="renovated">Renovated</option>
          <option value="new">New</option>
          <option value="luxury">Luxury</option>
        </motion.select>

        <motion.label
          layout={!reduce}
          className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300"
          whileHover={reduce ? undefined : { scale: 1.01 }}
          whileTap={reduce ? undefined : { scale: 0.995 }}
        >
          <input
            type="checkbox"
            name="furnished"
            checked={filters.furnished}
            onChange={onChange}
            className="size-4 rounded border-slate-300 bg-zinc-900 text-cyan-400 focus:ring-cyan-400/40"
          />
          Furnished
        </motion.label>

        <motion.label
          layout={!reduce}
          className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300"
          whileHover={reduce ? undefined : { scale: 1.01 }}
          whileTap={reduce ? undefined : { scale: 0.995 }}
        >
          <input
            type="checkbox"
            name="parking"
            checked={filters.parking}
            onChange={onChange}
            className="size-4 rounded border-slate-300 bg-zinc-900 text-cyan-400 focus:ring-cyan-400/40"
          />
          Parking
        </motion.label>
      </motion.div>
    </motion.div>
  )
}

export default ApartmentFilters
