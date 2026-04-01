import express from 'express'
import {
  getAllApartments,
  createApartment,
} from '../controllers/apartmentController.js'

const router = express.Router()

router.get('/', getAllApartments)
router.post('/', createApartment)

export default router