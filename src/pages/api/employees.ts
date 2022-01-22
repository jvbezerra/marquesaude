import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

const HANDLE_REQUEST: { [key: string]: any } = {
  'POST': async ({ body: data }: NextApiRequest) => {
    return prisma.employee.create({ data })
  },
  'GET': async ({ query }: NextApiRequest) => {
    return prisma.employee.findMany({
      include: { hours: true },
      where: { unitId: Number(query.id) }
    })
  },
  'PUT': async ({ query, body: data }: NextApiRequest) => {
    return prisma.employee.update({ data, where: { id: Number(query.id) } })
  },
  'DELETE': async ({ query }: NextApiRequest) => {
    return prisma.employee.delete({ where: { id: Number(query.id) } })
  },
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await HANDLE_REQUEST[req.method!](req)
    res.status(200).json(response)
  } catch (error) {
    res.status(500)
  }
}