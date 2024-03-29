import { Schema, model, models } from "mongoose";

export interface WorkReqBody {
    creator: string; // is string but when create to store in DB, use new ObjectId(creator)
    category: string;
    title: string;
    photos: string[];
    description: string;
    price: number;
}

const WorkSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: [true, 'Creator is required']
    },
    category: {
        type: String,
        require: [true, 'Category is required']
    },
    title: {
        type: String,
        require: [true, 'Title is required']
    },
    workPhotoURLs: {
        type: [String],
        default: []
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        require: [true, 'Price is required']
    },
}, { timestamps: true })

const Work = models.Work || model('Work', WorkSchema)

export default Work