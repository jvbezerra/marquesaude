import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import api from '../../../services/api'

const credentialHandlers = {
  'unit': data => {
    const { type, ...unit} = data
    return {
      status: 'success', 
      unit,
      type,
    }
  },
  'user': data => {
    const { type, unit, ...user} = data
    return {
      status: 'success', 
      user,
      unit,
      type,
    }
  },
}

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
          return credentialHandlers[data.user.type](data.user)
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