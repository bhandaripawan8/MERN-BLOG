
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required:true, unique: true},
    role: {type: String, enum: ['admin', 'user'], default: 'user'},
}, {timestamps: true})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel;