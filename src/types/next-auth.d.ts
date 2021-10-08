import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: Citizen,
    unit?: Unit,
    type: "user" | "unit",
    accessToken: string,
  }
}