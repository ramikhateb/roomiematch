type FormInputProps = {
  label: string
  name: string
  type?: string
  placeholder?: string
  value: string
  error?: string
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void
}

const inputBase =
  'w-full rounded-xl border px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500/30'

function FormInput({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  error,
  onChange,
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600"
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
        className={`${inputBase} ${
          error
            ? 'border-red-300 bg-red-50 focus:border-red-400'
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
