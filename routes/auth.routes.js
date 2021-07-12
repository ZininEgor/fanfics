const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


const nodemailer = require('nodemailer')
const {google} = require('googleapis')

const CLIENT_ID = '672856890685-hh4h6i4s73e0ap73m4em7uu190inb6i6.apps.googleusercontent.com'
const CLIENT_SECRET = 'crLtp0M8kfnlda7mpPA7_iQq'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04MKhSkWi6i9CCgYIARAAGAQSNwF-L9Irk6OdHTbCw5U7YjqVj57kfcb2d4PSGPtJxmrD3ZMBbFoJyuhnqwZ66JFwtEamlWXjgOY'

const oAuth2client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2client.setCredentials({refresh_token: REFRESH_TOKEN})

async function sendMail(email, token) {
    try {
        const accessToken = await oAuth2client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'oAuth2',
                user: 'freddie7789123456@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: "Fan-Fics 🌚 <freddie7789123456@gmail.com>",
            to: email,
            subject: "Пройдите по ссылке чтобы завершить найстроку аккаунта",
            text: "Fanfics tech",
            html: `
                    <h1>Добро пожаловать на Fan-Fics</h1>
                    <a href="http://localhost:3000/activate/${token}">Кликай на меня</a>
                  `
        }

        const result = await transport.sendMail(mailOptions)
        return result
    } catch (e) {
        return e
    }
}

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password1', 'Минимальная длина пароля 6 символов')
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при регистрации'
                })
            }

            const {email, nickname, password1, password2} = req.body

            if (password1 !== password2) {
                return res.status(400).json({message: 'Пароли не совпадают'})
            }
            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: 'Такой пользователь уже существует'})
            }

            const hashedPassword = await bcrypt.hash(password1, 12)
            const user = new User({email, password: hashedPassword, name: nickname})

            await user.save()
            sendMail(email, user._id).then(result => console.log('email send...', result))
                .catch(e => console.log(e.message))
            res.status(201).json({message: 'Пользователь создан'})

        } catch (e) {
            console.log(e.message)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    })


// /api/auth/verified/:token
router.get("/verified/:token",
    async (request, response) => {
        try {
            const user = await User.findOneAndUpdate({_id: request.params.token},
                {
                    $set: {
                        isActive: true
                    }})
            if (!user) {
                return response.status(400).json({message: false})
            }
            return response.status(200).json({message: true})

        } catch (e) {
            response.status(500).json({message: e + 'Что-то пошло не так, попробуйте снова'})
        }
    })


// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при входе в систему'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})


            if (!user) {
                return res.status(400).json({message: 'Пользователь не найден'})
            }

            if (!user.isActive) {
                return res.status(400).json({message: 'Проверьте вашу почту'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '100h'}
            )

            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    })


module.exports = router