const MAX_FILE_BYTES = 5 * 1024 * 1024
const MAX_DIMENSION = 512
const OUTPUT_QUALITY = 0.85

export async function processProfilePhotoFile(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file (JPG, PNG, or WebP).')
  }

  if (file.size > MAX_FILE_BYTES) {
    throw new Error('Image must be 5 MB or smaller.')
  }

  const dataUrl = await readFileAsDataUrl(file)
  return resizeImageDataUrl(dataUrl)
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
        return
      }
      reject(new Error('Could not read the image file.'))
    }
    reader.onerror = () => reject(new Error('Could not read the image file.'))
    reader.readAsDataURL(file)
  })
}

function resizeImageDataUrl(dataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      const scale = Math.min(1, MAX_DIMENSION / Math.max(image.width, image.height))
      const width = Math.max(1, Math.round(image.width * scale))
      const height = Math.max(1, Math.round(image.height * scale))
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const context = canvas.getContext('2d')
      if (!context) {
        reject(new Error('Could not process the image.'))
        return
      }

      context.drawImage(image, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', OUTPUT_QUALITY))
    }
    image.onerror = () => reject(new Error('Could not load the image.'))
    image.src = dataUrl
  })
}
