import type { FastifyDynamicSwaggerOptions } from '@fastify/swagger'
import type { FastifySwaggerUiOptions } from '@fastify/swagger-ui'

export const swaggerOptions: FastifyDynamicSwaggerOptions = {
  openapi: {
    info: {
      title: 'API Solid',
      description:
        'Documentacao das principais rotas da API para demonstracao do projeto.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        refreshTokenCookie: {
          type: 'apiKey',
          in: 'cookie',
          name: 'refreshToken',
        },
      },
    },
  },
}

export const swaggerUiOptions: FastifySwaggerUiOptions = {
  routePrefix: '/docs',
}
