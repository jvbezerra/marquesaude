import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import api from '../../../services/api'
import { UsersSchema } from '../../../services/usersSchema'

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { data } = await api.get('/auth/signin', {
          auth: {
            username: credentials.key,
            password: credentials.password,
          }
        })

        if (data) {
          return UsersSchema[data.user.type].credentialHandler(data.user)
        } else {
          return null
        }
      },
      credentials: {
        key: { label: "Key", type: "text " },
        password: {  label: "Senha", type: "password" }
      },
    }),
  ],
  callbacks: {
    async jwt(token, data) {
      if (data) {
        //token.accessToken = user.token
        token.data = data
      }
  
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