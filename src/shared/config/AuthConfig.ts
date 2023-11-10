export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'a2FuYmFuQXBw',
    expiresIn: 86400, // 1d
  },
}
