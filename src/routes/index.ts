import userRouter from './user.route';
import uploadRouter from './uploadfile.route'
import chanelRouter from './chanels.route'
import channel_userRouter from './channel-user.route'
import aggregateRouter from '../routes/aggrerate.route';
import conversationRouter from '../routes/conversations.route';
import useronlineRouter from './user-online.route'
import pingRouter from './ping.route'

function route(app: any)
{
    app.use('/users', userRouter);
    app.use('/upload', uploadRouter);
    app.use('/channels', chanelRouter);
    app.use('/', pingRouter )
    app.use('/channels-user', channel_userRouter);
    app.use('/aggregate', aggregateRouter );
    app.use('/conversation', conversationRouter);
    app.use('/user-online', useronlineRouter);

}

export default route;