import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envCandidates = [
  path.resolve(__dirname, '../.env'),
  path.resolve(__dirname, '../../.env'),
]

for (const envPath of envCandidates) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath })
    break
  }
}

const prisma = new PrismaClient()

const users = [
  {
    email: 'noa.levi@example.com',
    passwordHash: '$2a$10$QjN0fY8w9xGQXx2X6Qv2xO9sS3F4uQbY1w8tLhA7R1kM4Vn7C8p2W',
    fullName: 'Noa Levi',
    budget: 7200,
    preferences: {
      city: 'Tel Aviv',
      minRooms: 2,
      maxRooms: 3,
      furnished: true,
      parking: false,
      smoking: false,
      pets: true,
      lifestyle: 'quiet',
    },
    profile: { age: 27, occupation: 'Product Designer', bio: 'Clean, friendly, and early sleeper.' },
  },
  {
    email: 'david.cohen@example.com',
    passwordHash: '$2a$10$kS4xR8mP2uA7sY1nW3fG4eQ9jL6cH0vT2pR5mN8zX1bD7qK3uJ9aW',
    fullName: 'David Cohen',
    budget: 8900,
    preferences: {
      city: 'Ramat Gan',
      minRooms: 2,
      maxRooms: 4,
      furnished: false,
      parking: true,
      smoking: false,
      pets: false,
      lifestyle: 'social',
    },
    profile: { age: 30, occupation: 'Software Engineer', bio: 'Into fitness and weekend hikes.' },
  },
  {
    email: 'maya.benari@example.com',
    passwordHash: '$2a$10$Wm2kT9dF4pL1aS7qH8rJ5vN3xC6bZ0yU2eD9gK4mP7tR1nF8sQ5uA',
    fullName: 'Maya Ben Ari',
    budget: 6500,
    preferences: {
      city: 'Givatayim',
      minRooms: 1,
      maxRooms: 2,
      furnished: true,
      parking: false,
      smoking: false,
      pets: true,
      lifestyle: 'quiet',
    },
    profile: { age: 25, occupation: 'UX Researcher', bio: 'Works from home 2 days a week.' },
  },
  {
    email: 'itan.shalev@example.com',
    passwordHash: '$2a$10$Bv6pM1xN9qR3tY7kL2cD5sF8hJ4uW0eA6zP1mG7nQ9rT2vK5xC8dE',
    fullName: 'Itan Shalev',
    budget: 5600,
    preferences: {
      city: 'Bat Yam',
      minRooms: 1,
      maxRooms: 3,
      furnished: false,
      parking: true,
      smoking: true,
      pets: false,
      lifestyle: 'flexible',
    },
    profile: { age: 29, occupation: 'Sales Manager', bio: 'Easy going and night owl.' },
  },
  {
    email: 'yael.friedman@example.com',
    passwordHash: '$2a$10$Hk8tV3mR1pQ6xN9dF2sJ5aL7uC4bW0yE8gP3nK6rT1vM9qD2xF5zA',
    fullName: 'Yael Friedman',
    budget: 10200,
    preferences: {
      city: 'Herzliya',
      minRooms: 3,
      maxRooms: 4,
      furnished: true,
      parking: true,
      smoking: false,
      pets: true,
      lifestyle: 'quiet',
    },
    profile: { age: 33, occupation: 'Marketing Lead', bio: 'Loves cooking and hosting dinner.' },
  },
  {
    email: 'omer.katz@example.com',
    passwordHash: '$2a$10$Np4dJ7sF1qR9xM2kT6vB3aL8hC5uW0yE4gP7nK1rT9mQ2dF6xZ3uA',
    fullName: 'Omer Katz',
    budget: 6000,
    preferences: {
      city: 'Holon',
      minRooms: 2,
      maxRooms: 3,
      furnished: false,
      parking: false,
      smoking: false,
      pets: false,
      lifestyle: 'social',
    },
    profile: { age: 28, occupation: 'Data Analyst', bio: 'Tidy and likes shared movie nights.' },
  },
  {
    email: 'shira.avidan@example.com',
    passwordHash: '$2a$10$Qx3mL8tF1pR6dN9kV2sJ5aH7uC4bW0yE8gP3nK6rT1vM9qD2xF5zB',
    fullName: 'Shira Avidan',
    budget: 7400,
    preferences: {
      city: 'Jaffa',
      minRooms: 2,
      maxRooms: 3,
      furnished: true,
      parking: false,
      smoking: false,
      pets: true,
      lifestyle: 'flexible',
    },
    profile: { age: 26, occupation: 'Photographer', bio: 'Creative, respectful, and organized.' },
  },
  {
    email: 'gal.peretz@example.com',
    passwordHash: '$2a$10$Tn7kV2mR9pQ4xD1fL6sJ3aH8uC5bW0yE2gP9nK4rT7vM1qF6xZ3uB',
    fullName: 'Gal Peretz',
    budget: 8200,
    preferences: {
      city: 'Tel Aviv',
      minRooms: 2,
      maxRooms: 3,
      furnished: false,
      parking: true,
      smoking: false,
      pets: false,
      lifestyle: 'quiet',
    },
    profile: { age: 31, occupation: 'Architect', bio: 'Early riser and gym routine.' },
  },
  {
    email: 'liat.mizrahi@example.com',
    passwordHash: '$2a$10$M2qR7tF1pN9xD4kV6sJ3aH8uC5bW0yE2gP9nK4rT7vM1qF6xZ3uC',
    fullName: 'Liat Mizrahi',
    budget: 6900,
    preferences: {
      city: 'Ramat Aviv',
      minRooms: 1,
      maxRooms: 2,
      furnished: true,
      parking: false,
      smoking: false,
      pets: true,
      lifestyle: 'quiet',
    },
    profile: { age: 24, occupation: 'Student', bio: 'Studying psychology, calm and neat.' },
  },
  {
    email: 'ronen.barak@example.com',
    passwordHash: '$2a$10$D4kV7mR1pQ9xT2fL6sJ3aH8uC5bW0yE2gP9nK4rT7vM1qF6xZ3uD',
    fullName: 'Ronen Barak',
    budget: 9500,
    preferences: {
      city: 'Tel Aviv',
      minRooms: 3,
      maxRooms: 4,
      furnished: false,
      parking: true,
      smoking: false,
      pets: true,
      lifestyle: 'social',
    },
    profile: { age: 34, occupation: 'Account Executive', bio: 'Outgoing and loves city life.' },
  },
]

const apartments = [
  {
    title: 'Renovated 2BR Near Dizengoff Center',
    description: 'Bright corner apartment with balcony and elevator access.',
    price: 7600,
    city: 'Tel Aviv',
    address: 'King George St 67',
    latitude: 32.0742,
    longitude: 34.7759,
    rooms: 2,
    floor: 4,
    sizeSqm: 68,
    quality: 'renovated',
    isFurnished: true,
    hasParking: false,
    hasElevator: true,
    hasBalcony: true,
    imageUrl:
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Modern 3BR by Yarkon Park',
    description: 'Quiet street, fully upgraded kitchen, private parking.',
    price: 9800,
    city: 'Ramat Gan',
    address: 'Haroeh St 22',
    latitude: 32.0896,
    longitude: 34.8172,
    rooms: 3,
    floor: 6,
    sizeSqm: 92,
    quality: 'new',
    isFurnished: false,
    hasParking: true,
    hasElevator: true,
    hasBalcony: true,
    imageUrl:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Budget 2-room in Florentin',
    description: 'Classic old building, great location for nightlife.',
    price: 5200,
    city: 'Tel Aviv',
    address: 'Abarbanel St 18',
    latitude: 32.0557,
    longitude: 34.7694,
    rooms: 2,
    floor: 1,
    sizeSqm: 52,
    quality: 'old',
    isFurnished: true,
    hasParking: false,
    hasElevator: false,
    hasBalcony: false,
    imageUrl:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Luxury 4BR in North Tel Aviv',
    description: 'Premium tower unit with panoramic view and concierge.',
    price: 16500,
    city: 'Tel Aviv',
    address: 'Yehuda Hamaccabi St 41',
    latitude: 32.0984,
    longitude: 34.7991,
    rooms: 4,
    floor: 15,
    sizeSqm: 144,
    quality: 'luxury',
    isFurnished: false,
    hasParking: true,
    hasElevator: true,
    hasBalcony: true,
    imageUrl:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Renovated 3BR in Givatayim Center',
    description: 'Family-friendly block with storage and balcony.',
    price: 8700,
    city: 'Givatayim',
    address: 'Weizmann St 33',
    latitude: 32.0712,
    longitude: 34.8128,
    rooms: 3,
    floor: 5,
    sizeSqm: 88,
    quality: 'renovated',
    isFurnished: false,
    hasParking: true,
    hasElevator: true,
    hasBalcony: true,
    imageUrl:
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Student-Friendly Studio Near University',
    description: 'Compact and functional with shared yard access.',
    price: 4100,
    city: 'Ramat Aviv',
    address: 'Brodetsky St 12',
    latitude: 32.1147,
    longitude: 34.8031,
    rooms: 1,
    floor: 0,
    sizeSqm: 31,
    quality: 'old',
    isFurnished: true,
    hasParking: false,
    hasElevator: false,
    hasBalcony: false,
    imageUrl:
      'https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'New 2.5BR in Bat Yam Waterfront',
    description: 'Sea-view apartment, 7 min walk to light rail.',
    price: 6900,
    city: 'Bat Yam',
    address: 'Balfour St 109',
    latitude: 32.0154,
    longitude: 34.7508,
    rooms: 3,
    floor: 8,
    sizeSqm: 73,
    quality: 'new',
    isFurnished: false,
    hasParking: true,
    hasElevator: true,
    hasBalcony: true,
    imageUrl:
      'https://images.unsplash.com/photo-1617098474202-0d0d7f60d5f8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Luxury Penthouse in Herzliya',
    description: 'Top-floor duplex with huge terrace and private parking.',
    price: 21400,
    city: 'Herzliya',
    address: 'Sokolov St 4',
    latitude: 32.1634,
    longitude: 34.8443,
    rooms: 5,
    floor: 12,
    sizeSqm: 182,
    quality: 'luxury',
    isFurnished: true,
    hasParking: true,
    hasElevator: true,
    hasBalcony: true,
    imageUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Renovated 2BR in Holon',
    description: 'Great value, bright living room, close to transit.',
    price: 6100,
    city: 'Holon',
    address: 'Sokolov St 55',
    latitude: 32.016,
    longitude: 34.7797,
    rooms: 2,
    floor: 3,
    sizeSqm: 61,
    quality: 'renovated',
    isFurnished: false,
    hasParking: false,
    hasElevator: true,
    hasBalcony: true,
    imageUrl:
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Old but Spacious 3BR in Jaffa',
    description: 'High ceilings, authentic character, near flea market.',
    price: 7000,
    city: 'Jaffa',
    address: 'Yefet St 73',
    latitude: 32.0507,
    longitude: 34.7532,
    rooms: 3,
    floor: 2,
    sizeSqm: 95,
    quality: 'old',
    isFurnished: false,
    hasParking: false,
    hasElevator: false,
    hasBalcony: true,
    imageUrl:
      'https://images.unsplash.com/photo-1464890100898-a385f744067f?auto=format&fit=crop&w=1200&q=80',
  },
]

async function main() {
  await prisma.user.deleteMany()
  await prisma.apartment.deleteMany()
  await prisma.user.createMany({ data: users })
  await prisma.apartment.createMany({ data: apartments })
  console.log(`Seeded ${users.length} users.`)
  console.log(`Seeded ${apartments.length} apartments.`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
