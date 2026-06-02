import express from 'express'
import cors from 'cors'
import apartmentRoutes from './routes/apartmentRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' })
})

app.use('/api/apartments', apartmentRoutes)
app.use('/api/users', userRoutes)

export default app