import Conversation from '../model/conversation.model';

class ConversationController{
    async create(body: any){
      
        try {
          
            const respone = await Conversation.create(body);
            
            return true;
        } catch (error) {
           console.log("error", error)
        }
    }

    async getChannelConversation(channelID: string)
    {
        try {
            return await Conversation.find({channelID});
        } catch (error) {
            console.log(error)
        }
    }

    async requestConversation(req: any , res: any)
    {
        try {
            const channelID = req.params.channelID
            const channels = await Conversation.find({channelID});
            if(channels)
            {
                res.json(channels)
            }
            else
            {
                res.sendStatus(400)
            }
        } catch (error) {
            res.sendStatus(400);
            console.log(error)
        }
    }

}

export default new ConversationController