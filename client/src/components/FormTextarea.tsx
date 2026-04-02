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
  'w-full resize-y rounded-xl border px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:ring-2 ring-cyan-400/35'

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
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500"
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
            ? 'border-red-500/50 bg-red-500/[0.07] focus:border-red-400/40'
            : 'border-white/[0.1] bg-zinc-950/60 focus:border-cyan-400/35'
        }`}
      />

      {hint ? (
        <p className="mt-1.5 text-xs text-zinc-500">{hint}</p>
      ) : null}

      {error ? <p className="mt-2 text-sm text-red-300/95">{error}</p> : null}
    </div>
  )
}

export default FormTextarea
