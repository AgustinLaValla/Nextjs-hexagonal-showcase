export const config = {
  dbConnectionURL: process.env.MONGO_DB || 'mongodb://localhost:27017/todos_local_database',
  jwtSecret: process.env.JWT_SECRET || 'jwt_secret',
  httpPort: process.env.HTTP_PORT || 8080
}