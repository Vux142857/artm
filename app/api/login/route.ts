import User from "@/models/User.model";
import { connectToDB } from "@/mongodb/database";
import { initFolder } from "@/utils/file";
import bcrypt from "bcrypt";
import { writeFileSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";
import 'dotenv/config'

export const POST = async (req: Request) => {
    try {
        await connectToDB()
        const data = await req.formData()
        const email = data.get('email') as string
        const password = data.get('password') as string
        console.log(data)
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 400 })
        }
        const matchPassowrd = await bcrypt.compare(password, existingUser.password)
        if (!matchPassowrd) {
            return NextResponse.json({ message: 'Password is incorrect' }, { status: 400 })
        }
        return NextResponse.json({ message: 'Login successfully', user: existingUser }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}