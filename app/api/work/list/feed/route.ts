import Work from "@/models/Work.model"
import { connectToDB } from "@/mongodb/database"

export const GET = async (req: Request) => {
    try {
        await connectToDB()
        const workList = await Work.find().populate("creator").sort({ createdAt: -1 })
        return new Response(JSON.stringify(workList), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response("Failed to fetch Work List", { status: 500 })
    }
}