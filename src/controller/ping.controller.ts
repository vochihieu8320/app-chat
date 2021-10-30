
class Pingcontroller {

    hello(req: any, res: any)
    {
        res.json({data: "hello from vochihieu"})
    }

}


export default new Pingcontroller