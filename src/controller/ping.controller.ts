import {Request, Response} from 'express';

class Pingcontroller {

    hello(req: Request, res: Response)
    {
        res.json({data: "hello from vochihieu"})
    }

}


export default new Pingcontroller