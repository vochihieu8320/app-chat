import ChannelUser from '../model/chanel-user.model';




class ChannelUserController
{
    async getListChannels(req: any, res: any)
    {
        const {userID, skip} = req.query;
        if(userID && skip)
        {
            const check_user = await ChannelUser.findOne({userID: userID});
            if(check_user)
            {
                const result = await ChannelUser.aggregate([
                    {
                        $match: {userID: userID}
                    },
                    { "$addFields": { "userChannelId": { "$toObjectId": "$channelID" }}},
                    {
                        $lookup:
                        {
                           
                            from: "chanels",
                            localField:"userChannelId",
                            foreignField: "_id",
                            as: "channels"
                        }
                    },
                    {
                        $skip: +skip
                    },
                    {
                        $sort: {"updatedAt": -1}
                    }
                ])
        
                res.json(result);    
            }
            else
            {
                res.sendStatus(400);
            }
            
        }
        else
        {
            res.sendStatus(400);
        }


    }


    async checkChannel(req: any, res: any)
    {
        const userID = req.params.userID;
        try {
            const check_channel =<any> await ChannelUser.findOne({userID});
            const data = (check_channel) ? true : false
            res.json({status: 200, data: data});
        } catch (error) {
            
        }
    }

    async deleteChannelUser(req: any, res: any)
    {
        const {userID, channelID} = req.query
        try {
            await ChannelUser.findOneAndRemove({userID: userID, channelID: channelID});
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(400);
        }
    }

    async getUserInfo(req: any, res: any)
    {
        const channelID = req.params.channelID;
        try {
            const result = await ChannelUser.aggregate([
                {
                    $match: {channelID: channelID}
                },
                { "$addFields": { "userIdConvert": { "$toObjectId": "$userID" }}},
                {
                    $lookup:
                    {
                       
                        from: "users",
                        localField:"userIdConvert",
                        foreignField: "_id",
                        as: "userInfo"
                    }
                }
            ])
            res.json(result);
        } catch (error) {
            res.sendStatus(500);
        }
    }
}


export default new ChannelUserController