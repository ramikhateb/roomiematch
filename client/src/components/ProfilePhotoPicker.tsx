import { useId, useState } from 'react'
import UserAvatar from './UserAvatar'
import { processProfilePhotoFile } from '../utils/profilePhoto'

type ProfilePhotoPickerProps = {
  fullName: string
  photoUrl: string
  onPhotoChange: (photoUrl: string) => void
}

function ProfilePhotoPicker({ fullName, photoUrl, onPhotoChange }: ProfilePhotoPickerProps) {
  const inputId = useId()
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showUrlField, setShowUrlField] = useState(
    () => Boolean(photoUrl.trim()) && !photoUrl.trim().startsWith('data:')
  )

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      setIsProcessing(true)
      setError('')
      const processed = await processProfilePhotoFile(file)
      onPhotoChange(processed)
      setShowUrlField(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not upload photo.')
    } finally {
      setIsProcessing(false)
    }
  }

  function handleRemove() {
    onPhotoChange('')
    setError('')
    setShowUrlField(false)
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
        Profile picture
      </p>
      <p className="mt-1 text-sm text-slate-600">
        Upload a photo from your device. It is saved to your profile on this browser.
      </p>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
        <UserAvatar fullName={fullName} photoUrl={photoUrl} size="lg" className="ring-slate-200" />

        <div className="flex flex-wrap gap-2.5">
          <input
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            onChange={handleFileChange}
            disabled={isProcessing}
          />
          <label
            htmlFor={inputId}
            className={`inline-flex cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 ${
              isProcessing ? 'pointer-events-none opacity-60' : ''
            }`}
          >
            {isProcessing ? 'Processing…' : photoUrl ? 'Change photo' : 'Upload photo'}
          </label>
          {photoUrl ? (
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Remove
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setShowUrlField((value) => !value)}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            {showUrlField ? 'Hide URL' : 'Use image URL'}
          </button>
        </div>
      </div>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

      {showUrlField ? (
        <div className="mt-4">
          <label
            htmlFor={`${inputId}-url`}
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600"
          >
            Image URL
          </label>
          <input
            id={`${inputId}-url`}
            name="photoUrl"
            type="url"
            value={photoUrl.startsWith('data:') ? '' : photoUrl}
            onChange={(event) => onPhotoChange(event.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
          />
        </div>
      ) : null}
    </div>
  )
}

export default ProfilePhotoPicker
