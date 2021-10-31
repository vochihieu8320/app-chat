import Channel from '../model/chanel.model';
import Chanel_User from '../model/chanel-user.model';
import User from '../model/user.model';
class ChanelController{

    async create(req: any, res: any)
    {
        const name = req.body.name;
        const body = {
            ...req.body
        }

        try {
            const check_channel = await Channel.findOne({name});
            if(check_channel)
            {
                res.json({status: 400, error: "Channel is already existed"});
            }
            else
            {
                const new_channel = await Channel.create(body); 

                res.json({status: 200, data: new_channel})
            }
          
        } catch (error) {
            console.log(error)
            res.sendStatus(400);
        }
    }

    async join_channel(req: any, res: any)
    {
     
        const {email, channelID} = req.body;
        try {
            const find_user =<any> await User.findOne({email});
            if(find_user)
            {
                const check_channel = await Chanel_User.findOne({userID: find_user.email , channelID : channelID});
                if(check_channel)
                {
                    res.sendStatus(400);
                }
                else
                {
                    const body = {
                    userID : find_user._id,
                    channelID: channelID
                    }
                    const channel = await Chanel_User.create(body);
                     res.json({status: 200, channelUser: channel })     
                }
            }
            else
            {
                res.json({status: 200, data: "Account doesn't exist"})
            }
           
            
        } catch (error) {
            console.log(error)
            res.sendStatus(500);
        }
    }

    async DetailChannel(req: any, res: any)
    {
        try {
            const channelID = req.params.channelID;
            const check_channel = await Channel.findById(channelID);
            if(check_channel)
            {
                res.json({status: 200, data: check_channel});
            }
            else
            {
                res.sendStatus(400)
            }
        } catch (error) {
            res.sendStatus(500)
        }
    }
   //check user is in this channel or not
    async checkUserChannel(userID: string, channelID: string){
        try {
            const user_chanel = await  Chanel_User.findOne({userID: userID, channelID: channelID});
            if(user_chanel)
            {
                return true;
            }
            else
            {
                return false;
            }
        } catch (error) {
            
        }
    }

    async updateChannel(req : any , res: any)
    {
        const channelID = req.params.channelID;
        try {
            const body = {
                ...req.body
            }
            await Channel.updateOne({_id: channelID}, body);
            res.json({status: 200 , data: await Channel.findById(channelID)})
        } catch (error) {
            res.sendStatus(400);
        }
    }


    async deleteChannel(req: any , res: any)
    {
        const {userID, channelID} = req.query
        try {
           const find_channel = <any> await Channel.findById(channelID);
           if(find_channel.owner === userID)
           {
                await Channel.findByIdAndDelete(channelID);
                await Chanel_User.deleteMany({channelID: channelID})   
                res.json({status: 200})
           } 
           else
           {

                await Chanel_User.deleteOne({userID: userID, channelID: channelID})
                res.json({status: 200});   
           } 
           
        } catch (error) {
            res.json({status: 400});
        }
    }
}

export default new ChanelController