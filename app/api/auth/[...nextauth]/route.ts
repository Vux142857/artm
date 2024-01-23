//@ts-nocheck
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import 'dotenv/config'
import { connectToDB } from "@/mongodb/database";
import User from "@/models/User.model";
import bcrypt from "bcrypt";

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
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials: any, req: any) {
                await connectToDB()
                const { email, password } = credentials
                const existUser = await User.findOne({ email })
                if (!existUser) {
                    throw new Error('Invalid email or password')
                }
                const matchPassword = await bcrypt.compare(password, existUser.password)
                if (!matchPassword) {
                    throw new Error('Invalid email or password')
                }
                return existUser
            }
        })
    ],
    callbacks: {
        async session({ session }) {
            console.log(123)
            const sessionUser = await User.findOne({ email: (session.user.email) })
            session.user.id = sessionUser._id.toString()
            session.user = sessionUser
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
            return true
        },
    },
    secret: process.env.NEXTAUTH_SECRET as string
})

export { handler as GET, handler as POST }
