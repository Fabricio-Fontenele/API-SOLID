import 'dotenv/config'

import { PrismaClient, Role } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { hash } from 'bcryptjs'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is required')
}

const url = new URL(connectionString)
const schema = url.searchParams.get('schema') || 'public'

url.searchParams.delete('schema')

const pool = new Pool({ connectionString: url.toString() })

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool, { schema }),
})

async function main() {
  const passwordHash = await hash('123456', 6)

  const admin = await prisma.user.upsert({
    where: {
      email: 'admin@email.com',
    },
    update: {
      name: 'Admin Demo',
      password_hash: passwordHash,
      role: Role.ADMIN,
    },
    create: {
      id: '11111111-1111-4111-8111-111111111111',
      name: 'Admin Demo',
      email: 'admin@email.com',
      password_hash: passwordHash,
      role: Role.ADMIN,
    },
  })

  const member = await prisma.user.upsert({
    where: {
      email: 'member@email.com',
    },
    update: {
      name: 'Member Demo',
      password_hash: passwordHash,
      role: Role.MEMBER,
    },
    create: {
      id: '22222222-2222-4222-8222-222222222222',
      name: 'Member Demo',
      email: 'member@email.com',
      password_hash: passwordHash,
      role: Role.MEMBER,
    },
  })

  const nearbyGym = await prisma.gym.upsert({
    where: {
      id: '33333333-3333-4333-8333-333333333333',
    },
    update: {
      title: 'Academia Demo Centro',
      description: 'Academia proxima para testar check-in pela API.',
      phone: '85999990000',
      latitude: -3.731862,
      longitude: -38.52667,
    },
    create: {
      id: '33333333-3333-4333-8333-333333333333',
      title: 'Academia Demo Centro',
      description: 'Academia proxima para testar check-in pela API.',
      phone: '85999990000',
      latitude: -3.731862,
      longitude: -38.52667,
    },
  })

  await prisma.gym.upsert({
    where: {
      id: '44444444-4444-4444-8444-444444444444',
    },
    update: {
      title: 'Academia Demo Beira Mar',
      description: 'Academia usada para demonstrar busca por nome.',
      phone: '85999991111',
      latitude: -3.721323,
      longitude: -38.512126,
    },
    create: {
      id: '44444444-4444-4444-8444-444444444444',
      title: 'Academia Demo Beira Mar',
      description: 'Academia usada para demonstrar busca por nome.',
      phone: '85999991111',
      latitude: -3.721323,
      longitude: -38.512126,
    },
  })

  await prisma.checkIn.upsert({
    where: {
      id: '55555555-5555-4555-8555-555555555555',
    },
    update: {
      user_id: member.id,
      gym_id: nearbyGym.id,
      validated_at: new Date(),
    },
    create: {
      id: '55555555-5555-4555-8555-555555555555',
      user_id: member.id,
      gym_id: nearbyGym.id,
      validated_at: new Date(),
    },
  })

  console.log('Seed concluida.')
  console.log(`Admin: ${admin.email} / 123456`)
  console.log(`Member: ${member.email} / 123456`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
