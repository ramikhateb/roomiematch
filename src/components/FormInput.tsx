type FormInputProps = {
  label: string
  name: string
  type?: string
  placeholder?: string
  value: string
  error?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

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
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
          error
            ? 'border-red-500 bg-red-500/5'
            : 'border-white/10 bg-slate-900'
        }`}
      />

      {error ? (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      ) : null}
    </div>
  )
}

export default FormInput