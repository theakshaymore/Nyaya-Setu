import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import { env } from './config/env.js'
import { adminRouter } from './routes/admin.js'
import { authRouter } from './routes/auth.js'
import { bailRouter } from './routes/bail.js'
import { chatRouter } from './routes/chat.js'
import { docRouter } from './routes/doc.js'
import { firRouter } from './routes/fir.js'
import { rightsRouter } from './routes/rights.js'

export const app = express()

app.set('trust proxy', 1)

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true
  })
)
app.use(helmet())
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests. Please try again later.' }
  })
)

app.get('/health', (_req, res) => {
  return res.status(200).json({
    status: 'ok',
    service: 'nyayasetu-backend',
    environment: env.nodeEnv
  })
})

app.use('/api/auth', authRouter)
app.use('/api/chat', chatRouter)
app.use('/api/fir', firRouter)
app.use('/api/bail', bailRouter)
app.use('/api/doc', docRouter)
app.use('/api/rights', rightsRouter)
app.use('/api/admin', adminRouter)

app.use((_req, res) => {
  return res.status(404).json({ error: 'Route not found' })
})

app.use((error, _req, res, _next) => {
  const statusCode = error.statusCode || 500
  const message = error.message || 'Internal server error'

  if (env.nodeEnv !== 'production') {
    console.error(error)
  }

  return res.status(statusCode).json({ error: message })
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(env.port, () => {
    console.log(`NyayaSetu backend listening on port ${env.port}`)
  })
}
