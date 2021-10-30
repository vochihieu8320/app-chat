import aws from '../service/aws.service';
import conversationConller from './conversation.conller';




class UploadfileController
{
   async upload(req: any, res: any)
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

    async getFile(req : any, res: any)
    {
        const key = req.params.key
        const readStream = await aws.getFileStream(key);
        readStream.pipe(res);
        
    }

    async uploadAvtar(req: any, res: any)
    {
        const files = <any>req.file;       
        const file_upload = await aws.uploadFile(files, 'jpeg');
        await aws.deleteTempFile(files);
        return  res.json({status: 200, file: file_upload.Location}) 
    }

}

export default new UploadfileController
