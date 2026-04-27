const errorResponseSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
}

const gymResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    description: { type: 'string', nullable: true },
    phone: { type: 'string', nullable: true },
    latitude: { type: 'number' },
    longitude: { type: 'number' },
  },
}

const gymsResponseSchema = {
  type: 'object',
  properties: {
    gyms: {
      type: 'array',
      items: gymResponseSchema,
    },
  },
}

const coordinatesQuerySchema = {
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

export const searchGymsSchema = {
  tags: ['Gyms'],
  summary: 'Pesquisar academias por nome',
  security: [{ bearerAuth: [] }],
  querystring: {
    type: 'object',
    required: ['q'],
    properties: {
      q: { type: 'string' },
      page: { type: 'number', minimum: 1, default: 1 },
    },
  },
  response: {
    200: {
      description: 'Lista de academias encontradas',
      ...gymsResponseSchema,
    },
    401: {
      description: 'Token JWT ausente ou invalido',
      ...errorResponseSchema,
    },
  },
}

export const nearbyGymsSchema = {
  tags: ['Gyms'],
  summary: 'Listar academias proximas',
  security: [{ bearerAuth: [] }],
  querystring: coordinatesQuerySchema,
  response: {
    200: {
      description: 'Lista de academias proximas',
      ...gymsResponseSchema,
    },
    401: {
      description: 'Token JWT ausente ou invalido',
      ...errorResponseSchema,
    },
  },
}

export const createGymSchema = {
  tags: ['Gyms'],
  summary: 'Cadastrar academia',
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    required: ['title', 'description', 'phone', 'latitude', 'longitude'],
    properties: {
      title: { type: 'string' },
      description: {
        type: 'string',
        nullable: true,
      },
      phone: { type: 'string', nullable: true },
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
  },
  response: {
    201: {
      description: 'Academia cadastrada com sucesso',
    },
    401: {
      description: 'Token JWT ausente ou invalido',
      ...errorResponseSchema,
    },
    403: {
      description: 'Usuario sem permissao de administrador',
      ...errorResponseSchema,
    },
  },
}
