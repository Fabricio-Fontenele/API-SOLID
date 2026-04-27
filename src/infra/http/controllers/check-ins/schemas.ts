const errorResponseSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
}

const checkInResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    createdAt: { type: 'string', format: 'date-time' },
    validatedAt: { type: 'string', format: 'date-time', nullable: true },
    userId: { type: 'string', format: 'uuid' },
    gymId: { type: 'string', format: 'uuid' },
  },
}

const coordinatesBodySchema = {
  type: 'object',
  required: ['latitude', 'longitude'],
  properties: {
    latitude: {
      type: 'number',
      minimum: -90,
      maximum: 90,
    },
    longitude: {
      type: 'number',
      minimum: -180,
      maximum: 180,
    },
  },
}

export const checkInsHistorySchema = {
  tags: ['Check-ins'],
  summary: 'Listar historico de check-ins do usuario',
  security: [{ bearerAuth: [] }],
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'number', minimum: 1, default: 1 },
    },
  },
  response: {
    200: {
      description: 'Historico de check-ins',
      type: 'object',
      properties: {
        checkIns: {
          type: 'array',
          items: checkInResponseSchema,
        },
      },
    },
    401: {
      description: 'Token JWT ausente ou invalido',
      ...errorResponseSchema,
    },
  },
}

export const checkInsMetricsSchema = {
  tags: ['Check-ins'],
  summary: 'Buscar quantidade de check-ins do usuario',
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      description: 'Metricas do usuario',
      type: 'object',
      properties: {
        checkInsCount: { type: 'number' },
      },
    },
    401: {
      description: 'Token JWT ausente ou invalido',
      ...errorResponseSchema,
    },
  },
}

export const createCheckInSchema = {
  tags: ['Check-ins'],
  summary: 'Realizar check-in em uma academia',
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    required: ['gymId'],
    properties: {
      gymId: { type: 'string', format: 'uuid' },
    },
  },
  body: coordinatesBodySchema,
  response: {
    201: {
      description: 'Check-in realizado com sucesso',
    },
    400: {
      description: 'Limite diario ou distancia maxima excedida',
      ...errorResponseSchema,
    },
    401: {
      description: 'Token JWT ausente ou invalido',
      ...errorResponseSchema,
    },
    404: {
      description: 'Academia nao encontrada',
      ...errorResponseSchema,
    },
  },
}

export const validateCheckInSchema = {
  tags: ['Check-ins'],
  summary: 'Validar check-in',
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    required: ['checkInId'],
    properties: {
      checkInId: { type: 'string', format: 'uuid' },
    },
  },
  response: {
    204: {
      description: 'Check-in validado com sucesso',
    },
    400: {
      description: 'Check-in fora do prazo de validacao',
      ...errorResponseSchema,
    },
    401: {
      description: 'Token JWT ausente ou invalido',
      ...errorResponseSchema,
    },
    403: {
      description: 'Usuario sem permissao de administrador',
      ...errorResponseSchema,
    },
    404: {
      description: 'Check-in nao encontrado',
      ...errorResponseSchema,
    },
  },
}
