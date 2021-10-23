import moongoose from "mongoose";
const Chanel = new moongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        avatar: String,
        owner:{
            type: String,
            required: true
        },
        numberUser: Number
    },
    { timestamps: true }
    
)


const model = moongoose.model("Chanel", Chanel);

export default model;
