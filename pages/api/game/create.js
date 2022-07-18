import game from '../../../game.json'
import { v4 } from 'uuid'
import input_scheemas from '../../../controller/input_scheemas'
import fs from 'fs'

export default (req, res)=> {
    if (req.method != "POST") { 
        return res.status(404)
    } 
    const v = input_scheemas.game.create.validate(req.body)
    if (v.error) { 
        return res.status(403).json({error:v.error}) 
    }
    const roomId = v4()
    
    game[roomId] = {"name": req.body["room_name"], "players": [{"score":0, "char": "X", "name":req.body["username"]}]}
    fs.writeFileSync("./game.json", JSON.stringify(game))

    return res.json({"id":roomId})
}