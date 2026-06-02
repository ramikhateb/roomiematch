type UserAvatarProps = {
  fullName: string
  photoUrl?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeStyles = {
  sm: 'h-10 w-10 text-xs ring-2',
  md: 'h-12 w-12 text-sm ring-2',
  lg: 'h-16 w-16 text-base ring-[3px]',
  xl: 'h-28 w-28 text-xl ring-[3px] sm:h-36 sm:w-36 sm:text-2xl',
} as const

function getInitials(fullName: string) {
  return (
    fullName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || '?'
  )
}

function UserAvatar({
  fullName,
  photoUrl = '',
  size = 'md',
  className = '',
}: UserAvatarProps) {
  const trimmedPhoto = photoUrl.trim()
  const sizeClass = sizeStyles[size]

  if (trimmedPhoto) {
    return (
      <img
        src={trimmedPhoto}
        alt={fullName}
        className={`shrink-0 rounded-full object-cover ring-white ${sizeClass} ${className}`.trim()}
      />
    )
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-violet-600 font-semibold text-white ring-white ${sizeClass} ${className}`.trim()}
      aria-hidden
    >
      {getInitials(fullName)}
    </div>
  )
}

export default UserAvatar
