import Work from "@/models/Work.model";
import { connectToDB } from "@/mongodb/database";
import { writeFileSync } from "fs";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
    try {
        await connectToDB()
        const data = await req.formData()
        console.log(data)
        const creator = data.get('creator') as string
        const category = data.get('category') as string
        const title = data.get('title') as string
        const description = data.get('description') as string
        const price = data.get('price')
        console.log(data)
        const photos = data.getAll('photos') as File[]
        const workPhotoURLs = []

        for (const photo of photos) {
            const bytes = await photo.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const workPhotoPath = path.resolve('public/temp', photo.name)
            writeFileSync(workPhotoPath, buffer)
            const workPhotoURL = `/temp/${photo.name}`
            workPhotoURLs.push(workPhotoURL)
        }
        console.log(workPhotoURLs)
        const newWork = await Work.create({
            creator: new ObjectId(creator),
            category,
            title,
            description,
            price,
            workPhotoURLs
        })
        return NextResponse.json({ message: 'Work created successfully', work: newWork }, { status: 200 })
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}