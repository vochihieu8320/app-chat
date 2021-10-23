export class message
{
    userID?: string;
    channelID?: string;
    author: string;
    content: string;
    date_time: string;

    constructor(author: string, content: string, date_time: string, userID?:string, channelID?: string )
    {
        this.author = author;
        this.content = content;
        this.date_time = date_time;
        this.userID = userID;
        this.channelID = channelID
    }
}
