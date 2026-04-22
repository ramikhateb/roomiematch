import prisma from '../config/db.js'

const QUALITY_VALUES = new Set(['old', 'renovated', 'new', 'luxury'])

function normalizeQuality(value) {
  const normalized = String(value || '')
    .trim()
    .toLowerCase()
  if (normalized === 'available') return 'new'
  if (normalized === 'reserved') return 'old'
  if (normalized === 'rented') return 'renovated'
  if (normalized === 'inactive') return 'old'
  return normalized
}

export async function getAllApartments(req, res) {
  try {
    const {
      city,
      minPrice,
      maxPrice,
      rooms,
      quality,
      furnished,
      parking,
    } = req.query

    const filters = {}

    if (city) {
      filters.city = {
        contains: city,
        mode: 'insensitive',
      }
    }

    const requestedQuality = normalizeQuality(quality)
    if (requestedQuality && QUALITY_VALUES.has(requestedQuality)) {
      filters.quality = requestedQuality
    }

    if (rooms) {
      filters.rooms = Number(rooms)
    }

    if (furnished !== undefined) {
      filters.isFurnished = furnished === 'true'
    }

    if (parking !== undefined) {
      filters.hasParking = parking === 'true'
    }

    if (minPrice || maxPrice) {
      filters.price = {}

      if (minPrice) {
        filters.price.gte = Number(minPrice)
      }

      if (maxPrice) {
        filters.price.lte = Number(maxPrice)
      }
    }

    const apartments = await prisma.apartment.findMany({
      where: filters,
      orderBy: {
        createdAt: 'desc',
      },
    })

    res.json(apartments)
  } catch (error) {
    console.error('Error fetching apartments:', error)
    res.status(500).json({ message: 'Failed to fetch apartments' })
  }
}

export async function createApartment(req, res) {
  try {
    const {
      title,
      description,
      price,
      city,
      address,
      latitude,
      longitude,
      rooms,
      floor,
      sizeSqm,
      quality,
      isFurnished,
      hasParking,
      hasElevator,
      hasBalcony,
      imageUrl,
    } = req.body

    const normalizedQuality = normalizeQuality(quality)

    if (!title || !price || !city || !address || !rooms || !normalizedQuality) {
      return res.status(400).json({
        message: 'title, price, city, address, rooms, and quality are required',
      })
    }
    if (!QUALITY_VALUES.has(normalizedQuality)) {
      return res.status(400).json({
        message: 'quality must be one of: old, renovated, new, luxury',
      })
    }

    const apartment = await prisma.apartment.create({
      data: {
        title,
        description,
        price: Number(price),
        city,
        address,
        latitude: latitude !== undefined ? Number(latitude) : null,
        longitude: longitude !== undefined ? Number(longitude) : null,
        rooms: Number(rooms),
        floor: floor !== undefined ? Number(floor) : null,
        sizeSqm: sizeSqm !== undefined ? Number(sizeSqm) : null,
        quality: normalizedQuality,
        isFurnished: Boolean(isFurnished),
        hasParking: Boolean(hasParking),
        hasElevator: Boolean(hasElevator),
        hasBalcony: Boolean(hasBalcony),
        imageUrl,
      },
    })

    res.status(201).json(apartment)
  } catch (error) {
    console.error('Error creating apartment:', error)
    res.status(500).json({ message: 'Failed to create apartment' })
  }
}