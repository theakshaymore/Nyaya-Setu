import { Redis } from '@upstash/redis'

import { env } from './config/env.js'

const hasRedisConfig =
  Boolean(env.upstashRedisRestUrl) && Boolean(env.upstashRedisRestToken)

export const redis = hasRedisConfig
  ? new Redis({
      url: env.upstashRedisRestUrl,
      token: env.upstashRedisRestToken
    })
  : null

export function isRedisConfigured() {
  return Boolean(redis)
}
