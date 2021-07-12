const {Router} = require('express')
const auth = require('../middleware/profile.middleware')
const Comment = require('../models/Comment')
const User = require('../models/User')
const router = Router()

router.post(
    '/',
    auth,
    async (request, response) => {
        try {
            const {body, fanfic_id, user_id} = request.body
            const user = await User.findById(user_id)
            const comment = new Comment({
                user: user_id,
                fanfic: fanfic_id,
                user_name: user.name,
                photo: user.photo_url,
                body: body,
            })
            await comment.save()
            response.json({
                message: "ok"
            })
        } catch (e) {
            response.status(500).json({message: e + 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.get(
    '/:id',
    async (request, response) => {
        try {
            const comments = await Comment.find({fanfic: request.params.id})
            response.json(
                [...comments]
            )
        } catch (e) {
            response.status(500).json({message: e + 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

module.exports = router