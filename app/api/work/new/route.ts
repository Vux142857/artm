import Work from "@/models/Work.model";
import { connectToDB } from "@/mongodb/database";
import { writeFileSync } from "fs";
import { ObjectId } from "mongodb";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
    try {
        await connectToDB()
        const data = await req.formData()
        const creator = data.get('creator') as string
        const category = data.get('category') as string
        const title = data.get('title') as string
        const description = data.get('description') as string
        const price = data.get('price')
        const photos = data.getAll('workPhotoPaths') as File[]
        // Use Promise.all to wait for all asynchronous operations to complete
        const workPhotoURLs = await Promise.all(photos.map(async (photo) => {
            const bytes = await photo.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = nanoid() + '.jpg';
            const workPhotoPath = path.resolve('public/temp', fileName);
            writeFileSync(workPhotoPath, buffer);
            const workPhotoURL = `/temp/${fileName}`;
            return workPhotoURL;
        }));

        const newWork = await Work.create({
            creator: new ObjectId(creator),
            category: category.toLowerCase(),
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