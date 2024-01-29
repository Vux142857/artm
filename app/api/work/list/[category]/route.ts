import Work from "@/models/Work.model"
import { connectToDB } from "@/mongodb/database"

export const GET = async (req: Request, { params }: { params: { category: string } }) => {
    try {
        await connectToDB()
        const category = params.category
        let workList
        if (category !== "All") {
            workList = await Work.find({ category }).populate("creator")
        } else {
            workList = await Work.find().populate("creator")
        }

        return new Response(JSON.stringify(workList), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response("Failed to fetch Work List", { status: 500 })
    }
}