type PageHeaderProps = {
  eyebrow: string
  title: string
  subtitle: string
  accent?: string
}

function PageHeader({ eyebrow, title, subtitle, accent }: PageHeaderProps) {
  return (
    <header className="mb-8 max-w-3xl">
      <p className="mb-3 inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem] md:leading-tight">
        {title}{' '}
        {accent ? (
          <span className="bg-linear-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
            {accent}
          </span>
        ) : null}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
        {subtitle}
      </p>
    </header>
  )
}

export default PageHeader
