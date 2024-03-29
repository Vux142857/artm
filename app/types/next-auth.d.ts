import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
        _id: ObjectID,
        name: string,
        username: string,
        email: string,
        profileImageURL: string,
        wishlist: string[],
        cart: string[],
        order: string[],
        work: string[]
    }
  }
}