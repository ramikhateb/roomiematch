import type { Apartment, ApartmentFilters } from '../types/apartment'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:5001/api'

export async function getApartments(filters: ApartmentFilters): Promise<Apartment[]> {
  const params = new URLSearchParams()

  if (filters.city.trim()) {
    params.append('city', filters.city.trim())
  }

  if (filters.minPrice.trim()) {
    params.append('minPrice', filters.minPrice.trim())
  }

  if (filters.maxPrice.trim()) {
    params.append('maxPrice', filters.maxPrice.trim())
  }

  if (filters.rooms.trim()) {
    params.append('rooms', filters.rooms.trim())
  }

  if (filters.status.trim()) {
    params.append('status', filters.status.trim())
  }

  if (filters.furnished) {
    params.append('furnished', 'true')
  }

  if (filters.parking) {
    params.append('parking', 'true')
  }

  if (filters.search.trim()) {
    params.append('city', filters.search.trim())
  }

  const queryString = params.toString()
  const url = queryString
    ? `${API_BASE_URL}/apartments?${queryString}`
    : `${API_BASE_URL}/apartments`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch apartments')
  }

  return response.json()
}