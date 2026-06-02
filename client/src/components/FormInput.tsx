type FormInputProps = {
  label: string
  name: string
  type?: string
  placeholder?: string
  value: string
  error?: string
  dense?: boolean
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void
}

const inputBase =
  'w-full rounded-xl border px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500/30'

const inputDense =
  'w-full rounded-lg border px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500/25'

function FormInput({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  error,
  dense = false,
  onChange,
}: FormInputProps) {
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

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className={`${dense ? inputDense : inputBase} ${
          error
            ? 'border-red-300 bg-red-50 focus:border-red-400'
            : dense
              ? 'border-slate-200 bg-slate-50 focus:border-cyan-500 focus:bg-white'
              : 'border-slate-300 bg-white focus:border-cyan-500'
        }`}
      />

      {error ? (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      ) : null}
    </div>
  )
}

export default FormInput
