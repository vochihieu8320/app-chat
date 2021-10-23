import moongoose from "mongoose";
const Conversations = new moongoose.Schema(
    {
        userID:{
            type: String,
            required: true
        },
        channelID:
        {
            type: String,
            required: true
        },
        author: String,
        date_time: String,
        content: String,
        files: String,
        is_video: Boolean
      
    },
    { timestamps: true }
    
)
const model = moongoose.model("Conversations",  Conversations);

export default model;
