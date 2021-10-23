import {Request, Response} from 'express';
import aws from '../service/aws.service';
import conversationConller from './conversation.conller';

class UploadfileController
{
   async upload(req: Request, res: Response)
    {
       
        try {
            const files = <any>req.file;       
            const {userID, channelID, filetype, author} = req.query;
            const file_upload = await aws.uploadFile(files, filetype);;
            await aws.deleteTempFile(files);
           return  res.json({status: 200, file: file_upload.Location})     
        } catch (error) {
            console.log("error", error)
            res.sendStatus(400)
        }
       
    }

    async getFile(req : Request, res: Response)
    {
        const key = req.params.key
        const readStream = await aws.getFileStream(key);
        readStream.pipe(res);
        
    }

}

export default new UploadfileController
