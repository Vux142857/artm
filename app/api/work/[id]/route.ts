import Work from "@/models/Work.model"
import { connectToDB } from "@/mongodb/database"
import { writeFileSync } from "fs"
import { nanoid } from "nanoid"
import path from "path"

export async function GET(req: Request, { params }: any) {
    await connectToDB()
    const work = await Work.findOne({ _id: params.id })
    if (!work) {
        return new Response('Work not found', { status: 404 })
    }
    return new Response(JSON.stringify(work), { status: 200 })
}

export async function PATCH(req: Request, { params }: any) {
    try {
        await connectToDB()
        const data = await req.formData()
        const creator = data.get('creator') as string
        const category = data.get('category') as string
        const title = data.get('title') as string
        const description = data.get('description') as string
        const price = data.get('price')
        const photos = data.getAll('workPhotoPaths') as File[]
        const workPhotoURLs = [] as string[]
        photos.forEach(async (photo) => {
            if (photo instanceof Object) {
                const bytes = await photo.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const fileName = nanoid() + '.jpg';
                const workPhotoPath = path.resolve('public/temp', fileName);
                writeFileSync(workPhotoPath, buffer);
                const workPhotoURL = `/temp/${fileName}.jpg`;
                workPhotoURLs.push(workPhotoURL);
            } else {
                workPhotoURLs.push(photo)
            }
        });
        const updatedWork = await Work.findOneAndUpdate({ _id: params.id }, {
            creator,
            category,
            title,
            description,
            price,
            workPhotoURLs
        })
        if (!updatedWork) {
            return new Response('Work not found', { status: 404 })
        }
        return new Response('Update work succesfully!', { status: 200 })
    } catch (error: any) {
        console.log(error.message)
        return new Response('Internal server error', { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: any) {
    try {
        await connectToDB()
        const deletedWork = await Work.findOneAndDelete({ _id: params.id })
        if (!deletedWork) {
            return new Response('Work not found', { status: 404 })
        }
        return new Response('Delete work succesfully!', { status: 200 })
    } catch (error: any) {
        console.log(error.message)
        return new Response('Internal server error', { status: 500 })
    }
}