import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: MSUser,
    unit?: Unit,
    type: "user" | "unit",
    accessToken: string,
  }
}