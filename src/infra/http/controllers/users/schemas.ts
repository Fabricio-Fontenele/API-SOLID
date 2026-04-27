const errorResponseSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
}

const tokenResponseSchema = {
  type: 'object',
  properties: {
    token: { type: 'string' },
  },
}

const userResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    role: { type: 'string', enum: ['MEMBER', 'ADMIN'] },
    createdAt: { type: 'string', format: 'date-time' },
  },
}

export const registerSchema = {
  tags: ['Users'],
  summary: 'Cadastrar um novo usuario',
  body: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string' },
      email: {
        type: 'string',
        format: 'email',
      },
      password: { type: 'string', minLength: 6 },
    },
  },
  response: {
    201: {
      description: 'Usuario cadastrado com sucesso',
    },
    409: {
      description: 'E-mail ja cadastrado',
      ...errorResponseSchema,
    },
  },
}

export const authenticateSchema = {
  tags: ['Users'],
  summary: 'Autenticar usuario',
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      password: { type: 'string', minLength: 6 },
    },
  },
  response: {
    200: {
      description: 'Usuario autenticado',
      ...tokenResponseSchema,
    },
    400: {
      description: 'Credenciais invalidas',
      ...errorResponseSchema,
    },
  },
}

export const refreshSchema = {
  tags: ['Users'],
  summary: 'Renovar token JWT usando o refresh token do cookie',
  security: [{ refreshTokenCookie: [] }],
  response: {
    200: {
      description: 'Token renovado',
      ...tokenResponseSchema,
    },
    401: {
      description: 'Refresh token ausente ou invalido',
      ...errorResponseSchema,
    },
  },
}

export const profileSchema = {
  tags: ['Users'],
  summary: 'Buscar perfil do usuario autenticado',
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      description: 'Perfil do usuario',
      type: 'object',
      properties: {
        user: userResponseSchema,
      },
    },
    401: {
      description: 'Token JWT ausente ou invalido',
      ...errorResponseSchema,
    },
  },
}
