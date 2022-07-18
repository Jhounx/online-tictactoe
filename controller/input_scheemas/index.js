import joi from 'joi'

export default { 
    game: {
        create: joi.object({
            "room_name": joi.string().required().min(3).max(30),
            "username": joi.string().required().min(3).max(30)
        })
    }
}