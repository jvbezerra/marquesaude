import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

const HANDLE_REQUEST: { [key: string]: any } = {
  'POST': async ({ body: data }: NextApiRequest) => {
    return prisma.appointment.create({ data })
  },
  'GET': async ({ query }: NextApiRequest) => {
    return prisma.appointment.findMany({
      include: { employee: true, user: true },
      where: { employee: { unitId: Number(query.id) } }
    })
  },
  'PUT': async ({ query, body: data }: NextApiRequest) => {
    return prisma.appointment.update({ data, where: { id: Number(query.id) } })
  },
  'DELETE': async ({ query }: NextApiRequest) => {
    return prisma.appointment.delete({ where: { id: Number(query.id) } })
  },
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await HANDLE_REQUEST[req.method!](req)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error })
  }
}