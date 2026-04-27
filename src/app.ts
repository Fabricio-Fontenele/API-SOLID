import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { usersRoutes } from './infra/http/controllers/users/routes'
import { gymsRoutes } from './infra/http/controllers/gyms/routes'
import { checkInsRoutes } from './infra/http/controllers/check-ins/routes'
import { fastifyErrorHandler } from './infra/http/error-handler'
import { env } from './infra/env'
import { swaggerOptions, swaggerUiOptions } from './infra/http/docs/swagger'

export const app = fastify()

app.register(fastifyCookie)
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifySwagger, swaggerOptions)
app.register(fastifySwaggerUi, swaggerUiOptions)
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler(fastifyErrorHandler)
