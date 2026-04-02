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
  'w-full rounded-xl border px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:ring-2 ring-cyan-400/35'

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
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500"
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
        className={`${inputBase} ${
          error
            ? 'border-red-500/50 bg-red-500/7 focus:border-red-400/40'
            : 'border-white/10 bg-zinc-950/60 focus:border-cyan-400/35'
        }`}
      />

      {error ? (
        <p className="mt-2 text-sm text-red-300/95">{error}</p>
      ) : null}
    </div>
  )
}

export default FormInput
