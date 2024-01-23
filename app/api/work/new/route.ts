import { connectToDB } from "@/mongodb/database";

export async function POST(req: Request) {
    try {
        await connectToDB()
        const data = await req.formData()
        const creator = data.get('creator')
        const category = data.get('category')
        const title = data.get('title')
        const description = data.get('description')
        const price = data.get('price')

        const photos = data.getAll('workPhotoURLs') as File[]

        const workPhotoURLs = []

        for (const photo of photos) {
            const bytes = await photo.arrayBuffer() 
            workPhotoURLs.push(photo)
        }
    } catch (error) {
        
    }
}