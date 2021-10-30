import Channel from '../model/chanel.model'
import ChannelUser from '../model/chanel-user.model';



class AggrerateController
{
    async Aggrerate(req: any, res: any)
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
                        $limit: 5
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


    // async Count(req: Request, res: Response)
    // {
    //     const userID: 
    // }

}


export default new AggrerateController