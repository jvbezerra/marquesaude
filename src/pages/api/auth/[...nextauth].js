import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import prisma from '../../../lib/prisma'
import { UserTypes } from '../../../lib/usersSchema'

const UserAuthenticate = {
  [UserTypes.Unit]: async (key, password) => {
    const unit = await prisma.unit.findUnique({
      where: { cnes: key }
    })

    if (unit && unit.password === password) {
      const { password, ...result } = unit
      return {
        status: 'success', 
        unit: result,
        type: 'unit',
      }
    }

    return null
  },
  [UserTypes.Citizen]: async (key, password) => {
    const user = await prisma.user.findUnique({
      where: { susCard: key },
      include: { unit: true }
    })

    if (user && user.password === password) {
      const { password, unit, ...result } = user
      return {
        status: 'success', 
        user: result,
        unit,
        type: 'user',
      }
    }

    return null
  }
}

export default NextAuth({
  providers: [
    Providers.Credentials({
      authorize: async ({ key, type, password }) => UserAuthenticate[type](key, password),
      credentials: {
        key: { label: "key", type: "text " },
        type: { label: "type", type: "text " },
        password: {  label: "password", type: "password" }
      },
    }),
  ],
  callbacks: {
    async jwt(token, data) {
      if (data) token.data = data
      return token
    },
  
    async session(session, token) {
      session[token.data.type] = token.data[token.data.type]
      session.type = token.data.type
      if (session.type == 'user') session.unit = token.data.unit
      
      return session
    },

    async redirect(url, baseUrl = "http://localhost:3000") {
      return url.startsWith(baseUrl)
        ? url
        : baseUrl+url
    }
  },
  pages: {
    signIn: "/",
    error: "/"
  },
  json: "true",
  site: process.env.NEXTAUTH_URL || "http://localhost:3000",
})