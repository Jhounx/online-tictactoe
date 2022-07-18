import game from '../../../game.json'

export default (req, res) => {
    const search = req.query["search"]
    const response = [] 
    Object.keys(game).map(id => { 
        if (game[id]["players"].length == 1) {
            if (search) {
                if (game[id]["name"].includes(search)){
                    response.push({id, "name": game[id]["name"]})
                }
            } else {
                response.push({id, "name": game[id]["name"]})
            }
        }
    })
    return res.json(response)
}