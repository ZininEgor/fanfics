const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const Fanfiction = require('../models/Fanfiction')
const router = Router()

router.get(
    '/',
    async (request, response) => {
        try {
            const filter = {}
            const fanfiction = await Fanfiction.find(filter)
            response.json({

                items: [...fanfiction],
            })
        } catch (e) {
            response.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

module.exports = router