export async function authMiddleware(_req, res, next) {
  return res.status(501).json({ error: 'Auth middleware not implemented yet' })
}
