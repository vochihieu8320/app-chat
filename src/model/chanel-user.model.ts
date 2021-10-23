import moongoose from "mongoose";
const Chanel_User = new moongoose.Schema(
    {
       userID:{
           type: String,
           required: true
       },
       channelID:
       {
           type: String,
           required: true
       }
    },
    { timestamps: true }
    
)


const model = moongoose.model("Chanel-User", Chanel_User);

export default model;
