import { Schema, model, models } from "mongoose";

export interface UserReqBody {
    username: string;
    name: string;
    email: string;
    profileImageURL: string;
    password: string;
    wishlist: string[];
    cart: string[];
    order: string[];
    work: string[];
}

const UserSchema = new Schema({
    username: {
        type: String,
        unique: [true, 'Username already exists'],
        require: [true, 'Username is required']
    },
    name: {
        type: String,
        require: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        require: [true, 'Email is required']
    },
    profileImageURL: {
        type: String,
        require: [true, 'Profile image is required']
    },
    password: {
        type: String,
        require: [true, 'Password is required']
    }
    ,
    wishlist: {
        type: Array,
        default: []
    },
    cart: {
        type: Array,
        default: []
    },
    order: {
        type: Array,
        default: []
    },
    work: {
        type: Array,
        default: []
    }
}, { timestamps: true })

const User = models.User || model('User', UserSchema)

export default User