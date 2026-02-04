import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { env } from '@/env'

const connectionString = process.env.DATABASE_URL || env.DATABASE_URL
const url = new URL(connectionString)
const schema = url.searchParams.get('schema') || 'public'

url.searchParams.delete('schema')

const pool = new Pool({ connectionString: url.toString() })

export const prisma = new PrismaClient({
  adapter: new PrismaPg(pool, { schema }),
  log: env.NODE_ENV === 'dev' ? ['query', 'error'] : [],
})
