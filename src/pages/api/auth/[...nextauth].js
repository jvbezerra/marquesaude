import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { authenticate } from '../../../services'

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const data = await authenticate(credentials.cnes, credentials.password)
        if (data) {
          return {
            status: 'success', 
            data: data.user,
          }
        } else {
          return null
        }
      },
      credentials: {
        cnes: { label: "CNES", type: "text " },
        password: {  label: "Senha", type: "password" }
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        //token.accessToken = user.token
        token.user = user.data
      }
  
      return token
    },
  
    async session(session, token) {
      //session.accessToken = token.accessToken
      session.user = token.user
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
  },
  json: "true",
  site: process.env.NEXTAUTH_URL || "http://localhost:3000",
})