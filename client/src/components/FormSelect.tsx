import type { ChangeEvent } from 'react'

type Option = { value: string; label: string }

type FormSelectProps = {
  label: string
  name: string
  value: string
  options: readonly Option[]
  error?: string
  placeholder?: string
  dense?: boolean
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const selectBase =
  'w-full cursor-pointer appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30'

const selectDense =
  'w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 pr-9 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/25'

function FormSelect({
  label,
  name,
  value,
  options,
  error,
  placeholder = 'Choose one',
  dense = false,
  onChange,
}: FormSelectProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className={
          dense
            ? 'mb-1 block text-[11px] font-semibold text-slate-600'
            : 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600'
        }
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          className={`${dense ? selectDense : selectBase} ${
            error ? 'border-red-300 bg-red-50' : ''
          } ${value === '' ? 'text-slate-500' : 'text-slate-800'}`}
        >
          <option value="" disabled>
            ─ {placeholder} ─
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white text-slate-900">
              {opt.label}
            </option>
          ))}
        </select>
        <span
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-500 ${dense ? 'right-2.5' : 'right-3'}`}
          aria-hidden
        >
          <svg
            width={dense ? 14 : 16}
            height={dense ? 14 : 16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  )
}

export default FormSelect
