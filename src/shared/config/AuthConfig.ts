export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'ae2aeb935c2a8c7a80fb116093ef35ca',
    expiresIn: 86400, // 1d
  },
}
