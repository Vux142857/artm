// @ts-nocheck
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import 'dotenv/config'
import { connectToDB } from "@/mongodb/database";
import User from "@/models/User.model";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: (session.user && session.user.email) })
            session.user.id = sessionUser._id.toString()
            return session
        },
        async signIn({ account, profile }: any) {
            if (account.provider === "google") {
                try {
                    await connectToDB()
                    let user = await User.findOne({ email: profile.email })
                    if (!user) {
                        user = await User.create({
                            name: profile.name,
                            email: profile.email,
                            username: profile.username,
                            profileImageURL: profile.picture,
                            wishlist: [],
                            cart: [],
                            order: [],
                            work: []
                        })
                    }
                    return user
                } catch (error: any) {
                    console.log(error.message)
                }
            }
        },
    }
})

export { handler as GET, handler as POST }