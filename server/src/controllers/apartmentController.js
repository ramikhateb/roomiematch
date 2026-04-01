import prisma from '../config/db.js'

export async function getAllApartments(req, res) {
  try {
    const {
      city,
      minPrice,
      maxPrice,
      rooms,
      status,
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

    if (status) {
      filters.status = status
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
      status,
      isFurnished,
      hasParking,
      hasElevator,
      hasBalcony,
      imageUrl,
    } = req.body

    if (!title || !price || !city || !address || !rooms || !status) {
      return res.status(400).json({
        message: 'title, price, city, address, rooms, and status are required',
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
        status,
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