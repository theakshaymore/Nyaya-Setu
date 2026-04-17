import { redis } from '../redisClient.js'

const WINDOW_SECONDS = 15 * 60
const MAX_REQUESTS = 20

export async function rateLimiter(req, res, next) {
  if (!redis || !req.user?.id) {
    return next()
  }

  try {
    const key = `rate:${req.user.id}`
    const count = await redis.incr(key)

    if (count === 1) {
      await redis.expire(key, WINDOW_SECONDS)
    }

    if (count > MAX_REQUESTS) {
      return res.status(429).json({
        error: 'You have reached the request limit. Please wait a few minutes.'
      })
    }

    return next()
  } catch (_error) {
    return next()
  }
}
