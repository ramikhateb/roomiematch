export type ApartmentStatus = 'available' | 'reserved' | 'rented' | 'inactive'

export type Apartment = {
  id: string
  title: string
  description?: string | null
  price: number
  city: string
  address: string
  latitude?: number | null
  longitude?: number | null
  rooms: number
  floor?: number | null
  sizeSqm?: number | null
  status: ApartmentStatus | string
  isFurnished: boolean
  hasParking: boolean
  hasElevator: boolean
  hasBalcony: boolean
  imageUrl?: string | null
  createdAt: string
  updatedAt: string
}

export type ApartmentFilters = {
  city: string
  minPrice: string
  maxPrice: string
  rooms: string
  status: string
  furnished: boolean
  parking: boolean
  search: string
}