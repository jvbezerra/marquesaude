import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

const HANDLE_REQUEST: { [key: string]: any } = {
  'POST': async ({ body: data }: NextApiRequest) => {
    return prisma.user.create({ data })
  },
  'GET': async ({ query }: NextApiRequest) => {
    return prisma.user.findMany({ where: { unitId: Number(query.id) } })
  },
  'PUT': async ({ query, body: data }: NextApiRequest) => {
    return prisma.user.update({ data, where: { id: Number(query.id) } })
  },
  'DELETE': async ({ query }: NextApiRequest) => {
    return prisma.user.delete({ where: { id: Number(query.id) } })
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