
import user_oline from '../model/user-online.model';
import {Request, Response} from 'express'



class userOnline{

    async Create(userID: string, name: string, channelID: string, SocketID: string)
    {
        try {
            const find_useronline = await user_oline.findOne({userID: userID, channelID: channelID});
            if(!find_useronline)
            {
                const body = {
                    userID: userID,
                    name: name,
                    channelID: channelID,
                    socketID: SocketID
                }
                await user_oline.create(body)
            }
        } catch (error) {
            
        }
    }
    async getUserOnline( channelID: string)
    {
        try {
            const userOnline = await user_oline.aggregate([
                {
                    $match: {channelID: channelID}

                },
                {
                    "$addFields": { "userIdconvert": { "$toObjectId": "$userID" }},
                },
                {
                    $lookup:
                        {
                           
                            from: "users",
                            localField:"userIdconvert",
                            foreignField: "_id",
                            as: "userinfo"
                        }
                }
               
            ])
            return userOnline;
        } catch (error) {
            
        }
    }

    async getUserOnlineTest(req: Request , res: Response)
    {
        try {
            // const userOnline = await user_oline.find({channelID : channelID});

            // return userOnline;
            const channelID = req.params.channelID;
            const userOnline = await user_oline.aggregate([
                {
                    $match: {channelID: channelID}

                },
                {
                    "$addFields": { "userIdconvert": { "$toObjectId": "$userID" }},
                },
                {
                    $lookup:
                        {
                           
                            from: "users",
                            localField:"userIdconvert",
                            foreignField: "_id",
                            as: "userinfo"
                        }
                }
               
            ])
            res.json(userOnline);    
        } catch (error) {
            console.log(error);
        }
    }


    async userOfline(userID: string , channelID : string)
    {
        try {
            await user_oline.deleteOne({userID: userID, channelID: channelID});
            return await user_oline.find({channelID : channelID});
        } catch (error) {
            
        }
    }

    async userOffbrowser(socketID: string)
    {
        try {
            await user_oline.deleteOne({socketID: socketID});

        } catch (error) {
            console.log(error);
        }
    }
}


export default new userOnline
