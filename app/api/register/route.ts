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
        const name = data.get('name') as string
        const username = data.get('username') as string
        const email = data.get('email') as string
        const password = data.get('password') as string
        const file = data.get('profileImage') as File

        if (!file) {
            return NextResponse.json({ message: 'Please upload a profile picture' }, { status: 400 })
        }
        // Temporary storage data in comupter's memory 
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        initFolder(path.resolve('public/temp'))
        const profileImageURL = path.resolve('public/temp', file.name)
        writeFileSync(profileImageURL, buffer)
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return NextResponse.json({ message: 'Email already exists' }, { status: 409 })
        }

        // Hash password
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
            profileImageURL
        })
        return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}