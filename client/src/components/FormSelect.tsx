import type { ChangeEvent } from 'react'

type Option = { value: string; label: string }

type FormSelectProps = {
  label: string
  name: string
  value: string
  options: readonly Option[]
  error?: string
  placeholder?: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const selectBase =
  'w-full cursor-pointer appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30'

function FormSelect({
  label,
  name,
  value,
  options,
  error,
  placeholder = 'Choose one',
  onChange,
}: FormSelectProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600"
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
          className={`${selectBase} ${
            error ? 'border-red-300 bg-red-50' : ''
          } ${value === '' ? 'text-slate-600' : 'text-slate-800'}`}
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
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600"
          aria-hidden
        >
          <svg
            width="16"
            height="16"
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
