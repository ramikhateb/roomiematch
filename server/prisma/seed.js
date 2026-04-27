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
  await prisma.apartment.deleteMany()
  await prisma.apartment.createMany({ data: apartments })
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
