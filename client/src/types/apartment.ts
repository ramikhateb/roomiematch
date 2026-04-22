export type ApartmentCondition = 'old' | 'renovated' | 'new' | 'luxury'

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
  quality: ApartmentCondition | string
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
  quality: string
  furnished: boolean
  parking: boolean
  search: string
}