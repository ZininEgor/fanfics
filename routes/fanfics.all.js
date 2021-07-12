const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const Fanfic = require('../models/Fanfic')
const User = require('../models/User')
const router = Router()


router.get(
    '/',
    async (request, response) => {
        try {

            let query = {}


            const pageOptions = {
                page: parseInt(request.query.page, 10) || 0,
                limit: parseInt(request.query.limit, 10) || 7
            }

            if ((request.query.filter || "fanfiction") !== "fanfiction") {
                query.fanfiction = request.query.filter || "fanfiction"
            }

            let users = await User.find({})
            let fanfics = []
            await Fanfic.find(query)
                .skip(pageOptions.page * pageOptions.limit)
                .limit(pageOptions.limit)
                .exec(function (err, doc) {
                    if (err) {
                        response.status(500).json(err);
                        return;
                    }
                    fanfics = [...doc]
                    response.json([...fanfics])
                })
        } catch (e) {
            response.status(500).json({message: e + 'Что-то пошло не так, попробуйте снова'})
        }
    })

router.get(
    '/search',
    async (request, response) => {
        try {

            let query = {}


            const pageOptions = {
                page: parseInt(request.query.page, 10) || 0,
                limit: parseInt(request.query.limit, 10) || 7
            }
            await Fanfic.find({
                $text: {$search: request.query.search}
            })
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
    })


router.get(
    '/:id',
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

router.post(
    '/like/:id',
    async (request, response) => {
        try {
            const {user_id} = request.body
            const fanfic = await Fanfic.findById(request.params.id)
            if (fanfic.dis_liked.indexOf(user_id) !== -1) {
                const index = fanfic.dis_liked.indexOf(user_id)
                fanfic.dis_liked.splice(index, 1)
            }
            if (fanfic.liked.length === 0) {
                fanfic.liked = [user_id]
                await Fanfic.findOneAndUpdate({_id: request.params.id}, {
                    $set: {
                        liked: [...fanfic.liked],
                        dis_liked: [...fanfic.dis_liked]
                    }
                })
            } else {
                if (fanfic.liked.indexOf(user_id) === -1) {
                    fanfic.liked.push(user_id)
                    await Fanfic.findOneAndUpdate({_id: request.params.id}, {
                        $set: {
                            dis_liked: [...fanfic.dis_liked],
                            liked: [...fanfic.liked],
                        }
                    })
                }
            }
            response.json({
                liked: fanfic.liked,
                dis_liked: fanfic.dis_liked
            })


        } catch (e) {
            response.status(500).json({message: e + 'Что-то'})
        }
    }
)

router.post(
    '/dislike/:id',
    async (request, response) => {
        try {
            const {user_id} = request.body
            const fanfic = await Fanfic.findById(request.params.id)
            if (fanfic.liked.indexOf(user_id) !== -1) {
                const index = fanfic.liked.indexOf(user_id)
                fanfic.liked.splice(index, 1)
            }
            if (fanfic.dis_liked.length === 0) {
                fanfic.dis_liked = [user_id]
                await Fanfic.findOneAndUpdate({_id: request.params.id}, {
                    $set: {
                        liked: [...fanfic.liked],
                        dis_liked: [...fanfic.dis_liked]
                    }
                })
            } else {
                if (fanfic.dis_liked.indexOf(user_id) === -1) {
                    fanfic.dis_liked.push(user_id)
                    await Fanfic.findOneAndUpdate({_id: request.params.id}, {
                        $set: {
                            liked: [...fanfic.liked],
                            dis_liked: [...fanfic.dis_liked]
                        }
                    })
                }
            }
            response.json({
                liked: fanfic.liked,
                dis_liked: fanfic.dis_liked
            })


        } catch (e) {
            response.status(500).json({message: e + 'Что-то'})
        }
    }
)


module.exports = router