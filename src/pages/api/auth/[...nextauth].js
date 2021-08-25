import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { toast } from 'react-toastify'
import { unitSignIn, userSignIn } from '../../../services'
import { Roles } from './roles'

export default NextAuth({
  providers: [
    Providers.Credentials({
      id: "unit-login",
      async authorize(credentials) {
        try {
          const unit = await unitSignIn(credentials.cnes, credentials.password)

          if (unit) {
            return {status: 'success', data: {
              ...unit,
              role: Roles.UNIT
            }}
          } 
        } catch (error) {
          toast.error("Confira as informações!")
        }
      },
      credentials: {
        cnes: { label: "CNES", type: "text " },
        password: {  label: "Senha", type: "password" }
      },
    }),
    Providers.Credentials({
      id: "user-login",
      async authorize(credentials) {
        try {
          const user = await userSignIn(credentials.cpf, credentials.password)

          if (user) {
            return {status: 'success', data: {
              ...user,
              role: Roles.USER
            }}
          } 
        } catch (error) {
          toast.error("Confira as informações!")
        }
      },
      credentials: {
        cpf: { label: "CPF", type: "text " },
        password: {  label: "Senha", type: "password" }
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.token
      }
  
      return token
    },
  
    async session(session, token) {
      session.accessToken = token.accessToken
      return session
    }
  },
  pages: {
    signIn: "/",
  },
  json: "true",
  site: process.env.NEXTAUTH_URL || "http://localhost:3000",
})