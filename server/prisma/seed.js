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
    passwordHash: 'demo-seed',
    fullName: 'Noa Levi',
    budget: 7200,
    preferences: {
      preferredAreas: 'Tel Aviv, Florentin, Neve Tzedek',
      housingSituation: 'need_room',
      sleepSchedule: 'early',
      cleanliness: 'tidy',
      noiseTolerance: 'quiet',
      smoking: 'non_smoker_only',
      pets: 'open_to_pets',
      guestsComfort: 'sometimes',
      lifestyleNotes: 'Product designer, WFH twice a week, loves quiet mornings.',
    },
    profile: {
      photoUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
      city: 'Tel Aviv',
      bio: 'Clean, friendly, and early sleeper.',
      lifestyle: 'quiet',
      isPetLover: true,
      isSmoker: false,
      isStudent: false,
      worksFromHome: true,
    },
  },
  {
    email: 'david.cohen@example.com',
    passwordHash: 'demo-seed',
    fullName: 'David Cohen',
    budget: 8900,
    preferences: {
      preferredAreas: 'Ramat Gan, Bialik Street area',
      housingSituation: 'have_room',
      sleepSchedule: 'late',
      cleanliness: 'moderate',
      noiseTolerance: 'social_ok',
      smoking: 'outdoor_ok',
      pets: 'no_pets',
      guestsComfort: 'often',
      lifestyleNotes: 'Software engineer, gym after work, occasional game nights.',
    },
    profile: {
      photoUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
      city: 'Ramat Gan',
      bio: 'Into fitness and weekend hikes.',
      lifestyle: 'social',
      isPetLover: false,
      isSmoker: false,
      isStudent: false,
      worksFromHome: false,
    },
  },
  {
    email: 'maya.benari@example.com',
    passwordHash: 'demo-seed',
    fullName: 'Maya Ben Ari',
    budget: 6500,
    preferences: {
      preferredAreas: 'Givatayim, Ayalon corridor',
      housingSituation: 'need_room',
      sleepSchedule: 'flexible',
      cleanliness: 'tidy',
      noiseTolerance: 'moderate',
      smoking: 'non_smoker_only',
      pets: 'have_pets',
      guestsComfort: 'rarely',
      lifestyleNotes: 'UX researcher with a small cat, prefers calm evenings.',
    },
    profile: {
      photoUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&h=256&q=80',
      city: 'Givatayim',
      bio: 'Works from home 2 days a week.',
      lifestyle: 'quiet',
      isPetLover: true,
      isSmoker: false,
      isStudent: false,
      worksFromHome: true,
    },
  },
  {
    email: 'itan.shalev@example.com',
    passwordHash: 'demo-seed',
    fullName: 'Itan Shalev',
    budget: 5600,
    preferences: {
      preferredAreas: 'Bat Yam, near the beach',
      housingSituation: 'either',
      sleepSchedule: 'late',
      cleanliness: 'relaxed',
      noiseTolerance: 'social_ok',
      smoking: 'smoking_ok',
      pets: 'no_pets',
      guestsComfort: 'often',
      lifestyleNotes: 'Night owl sales manager, easy going and social.',
    },
    profile: {
      photoUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
      city: 'Bat Yam',
      bio: 'Easy going and night owl.',
      lifestyle: 'flexible',
      isPetLover: false,
      isSmoker: true,
      isStudent: false,
      worksFromHome: false,
    },
  },
  {
    email: 'yael.friedman@example.com',
    passwordHash: 'demo-seed',
    fullName: 'Yael Friedman',
    budget: 10200,
    preferences: {
      preferredAreas: 'Herzliya Pituach, north coast',
      housingSituation: 'need_room',
      sleepSchedule: 'early',
      cleanliness: 'tidy',
      noiseTolerance: 'quiet',
      smoking: 'non_smoker_only',
      pets: 'open_to_pets',
      guestsComfort: 'sometimes',
      lifestyleNotes: 'Marketing lead who loves cooking and hosting dinner.',
    },
    profile: {
      photoUrl:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
      city: 'Herzliya',
      bio: 'Loves cooking and hosting dinner.',
      lifestyle: 'quiet',
      isPetLover: true,
      isSmoker: false,
      isStudent: false,
      worksFromHome: false,
    },
  },
  {
    email: 'omer.katz@example.com',
    passwordHash: 'demo-seed',
    fullName: 'Omer Katz',
    budget: 6000,
    preferences: {
      preferredAreas: 'Holon, central neighborhoods',
      housingSituation: 'need_room',
      sleepSchedule: 'flexible',
      cleanliness: 'moderate',
      noiseTolerance: 'moderate',
      smoking: 'outdoor_ok',
      pets: 'no_pets',
      guestsComfort: 'sometimes',
      lifestyleNotes: 'Data analyst, tidy, enjoys shared movie nights.',
    },
    profile: {
      photoUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80',
      city: 'Holon',
      bio: 'Tidy and likes shared movie nights.',
      lifestyle: 'social',
      isPetLover: false,
      isSmoker: false,
      isStudent: false,
      worksFromHome: false,
    },
  },
  {
    email: 'shira.avidan@example.com',
    passwordHash: 'demo-seed',
    fullName: 'Shira Avidan',
    budget: 7400,
    preferences: {
      preferredAreas: 'Jaffa, Old City, flea market area',
      housingSituation: 'either',
      sleepSchedule: 'late',
      cleanliness: 'moderate',
      noiseTolerance: 'social_ok',
      smoking: 'outdoor_ok',
      pets: 'open_to_pets',
      guestsComfort: 'sometimes',
      lifestyleNotes: 'Photographer, creative and organized, flexible schedule.',
    },
    profile: {
      photoUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
      city: 'Jaffa',
      bio: 'Creative, respectful, and organized.',
      lifestyle: 'flexible',
      isPetLover: true,
      isSmoker: false,
      isStudent: false,
      worksFromHome: true,
    },
  },
  {
    email: 'gal.peretz@example.com',
    passwordHash: 'demo-seed',
    fullName: 'Gal Peretz',
    budget: 8200,
    preferences: {
      preferredAreas: 'Tel Aviv, north and center',
      housingSituation: 'have_room',
      sleepSchedule: 'early',
      cleanliness: 'tidy',
      noiseTolerance: 'quiet',
      smoking: 'non_smoker_only',
      pets: 'no_pets',
      guestsComfort: 'rarely',
      lifestyleNotes: 'Architect, early riser with a steady gym routine.',
    },
    profile: {
      photoUrl:
        'https://images.unsplash.com/photo-1519345185191-22c7f6e60f22?auto=format&fit=crop&w=256&h=256&q=80',
      city: 'Tel Aviv',
      bio: 'Early riser and gym routine.',
      lifestyle: 'quiet',
      isPetLover: false,
      isSmoker: false,
      isStudent: false,
      worksFromHome: false,
    },
  },
  {
    email: 'liat.mizrahi@example.com',
    passwordHash: 'demo-seed',
    fullName: 'Liat Mizrahi',
    budget: 6900,
    preferences: {
      preferredAreas: 'Ramat Aviv, near university',
      housingSituation: 'need_room',
      sleepSchedule: 'early',
      cleanliness: 'tidy',
      noiseTolerance: 'quiet',
      smoking: 'non_smoker_only',
      pets: 'have_pets',
      guestsComfort: 'rarely',
      lifestyleNotes: 'Psychology student, calm and neat, quiet study environment.',
    },
    profile: {
      photoUrl:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&h=256&q=80',
      city: 'Ramat Aviv',
      bio: 'Studying psychology, calm and neat.',
      lifestyle: 'quiet',
      isPetLover: true,
      isSmoker: false,
      isStudent: true,
      worksFromHome: false,
    },
  },
  {
    email: 'ronen.barak@example.com',
    passwordHash: 'demo-seed',
    fullName: 'Ronen Barak',
    budget: 9500,
    preferences: {
      preferredAreas: 'Tel Aviv, Rothschild, Lev HaIr',
      housingSituation: 'either',
      sleepSchedule: 'flexible',
      cleanliness: 'relaxed',
      noiseTolerance: 'social_ok',
      smoking: 'outdoor_ok',
      pets: 'open_to_pets',
      guestsComfort: 'often',
      lifestyleNotes: 'Outgoing account exec who loves city life and hosting.',
    },
    profile: {
      photoUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80',
      city: 'Tel Aviv',
      bio: 'Outgoing and loves city life.',
      lifestyle: 'social',
      isPetLover: true,
      isSmoker: false,
      isStudent: false,
      worksFromHome: false,
    },
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
