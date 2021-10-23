
import mongoose from 'mongoose';

const user_online = new mongoose.Schema(
    {
        userID: String,
        name: String,
        channelID : String
    },
    { timestamps: true }
)

const model = mongoose.model('User_online', user_online);
export default model;
