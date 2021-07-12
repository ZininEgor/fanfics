const {Router} = require('express')
const auth = require('../middleware/profile.middleware')
const Fanfic = require('../models/Fanfic')
const User = require('../models/User')
const router = Router()

router.post(
    '/',
    auth,
    async (request, response) => {
        try {
            const {title, body, fanfiction} = request.body
            const user = await User.findById(request.user.userId)
            const fanfic = new Fanfic({
                user: request.user.userId,
                user_name: user.name,
                title: title,
                body: body,
                fanfiction: fanfiction,
                url_photo: user.photo_url,
            })
            await fanfic.save()
            response.json({
                _id: fanfic._id,
            })
        } catch (e) {
            response.status(500).json({message: e + 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.put(
    '/',
    auth,
    async (request, response) => {
        try {
            const {title, body, fanfiction, url_photo, id_fanfic} = request.body
            const fanfic = await Fanfic.findOneAndUpdate(
                {_id: id_fanfic, user: request.user.userId},
                {
                    $set: {
                        title: title,
                        body: body,
                        fanfiction: fanfiction,
                        url_photo: url_photo,
                    }
                }
            )
            response.json({
                _id: fanfic._id,
                title: title,
                body: body,
                url_photo: url_photo,
                fanfiction: fanfiction,
            })
        } catch (e) {
            response.status(500).json({message: e + 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.delete(
    '/',
    auth,
    async (request, response) => {
        try {
            const {id_fanfic} = request.body
            const fanfic = await Fanfic.deleteOne(
                {_id: id_fanfic, user: request.user.userId},
            )
            response.json({
                message: 'ok'
            })
        } catch (e) {
            response.status(500).json({message: e + 'Что-то пошло не так, попробуйте снова'})
        }
    }
)


router.get(
    '/',
    auth,
    async (request, response) => {
        try {
            const pageOptions = {
                page: parseInt(request.query.page, 10) || 0,
                limit: parseInt(request.query.limit, 10) || 10
            }

            let query = {
                user: request.user.userId
            }
            if ((request.query.filter || "fanfiction") !== "fanfiction") {
                query.fanfiction = request.query.filter || "fanfiction"
            }


            await Fanfic.find(query)
                .skip(pageOptions.page * pageOptions.limit)
                .limit(pageOptions.limit)
                .exec(function (err, doc) {
                    if (err) {
                        response.status(500).json(err);
                        return;
                    }
                    response.json([...doc])
                })
        } catch (e) {
            response.status(500).json({message: e + 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.get(
    '/:id',
    auth,
    async (request, response) => {
        try {
            const fanfic = await Fanfic.findById(request.params.id)
            response.json({
                fanfic
            })

        } catch (e) {
            response.status(500).json({message: e + 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

module.exports = router