import type { ChangeEvent } from 'react'

type FormTextareaProps = {
  label: string
  name: string
  value: string
  placeholder?: string
  error?: string
  rows?: number
  hint?: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

const areaBase =
  'w-full resize-y rounded-xl border px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ring-cyan-200'

function FormTextarea({
  label,
  name,
  value,
  placeholder,
  error,
  rows = 4,
  hint,
  onChange,
}: FormTextareaProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600"
      >
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={onChange}
        className={`${areaBase} ${
          error
            ? 'border-red-300 bg-red-50 focus:border-red-400'
            : 'border-slate-300 bg-white focus:border-cyan-500'
        }`}
      />

      {hint ? (
        <p className="mt-1.5 text-xs text-slate-600">{hint}</p>
      ) : null}

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  )
}

export default FormTextarea
