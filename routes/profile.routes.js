const {Router} = require('express')
const User = require('../models/User')
const Fanfiction = require('../models/Fanfiction')
const auth = require('../middleware/profile.middleware')
const router = Router()
const {Storage} = require('@google-cloud/storage')
const Multer = require('multer')
const UUID = require("uuid-v4");


const storage = new Storage({
    projectId: 'fanfics-ac485',
    keyFilename: "routes/fanfics-ac485-firebase-adminsdk-381l4-4ac2e3cf13.json"
})

const bucket = storage.bucket('gs://fanfics-ac485.appspot.com')

const multer = Multer({
    storage: Multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './uploads')
        },
        filename: function (req, file, callback) {
            callback(null, Date.now() + file.originalname)
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

router.post('/upload', auth, multer.single('file'), (req, res) => {
    console.log('Upload Image')
    let file = req.file

    const uploadFile = async () => {

        let public_url = ""
        let uuid = UUID();
        await storage.bucket('fanfics-ac485.appspot.com').upload(file.path, {
            gzip: true,
            metadata: {
                cacheControl: 'public, max-age=31536000',
                metadata: {
                    firebaseStorageDownloadTokens: uuid,
                }
            },
        }).then((data) => {
            let file = data[0];
            public_url = "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid
            return Promise.resolve("https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid);
        });
        const profile = await User.findOneAndUpdate(
            {_id: req.user.userId},
            {
                $set: {
                    photo_url: public_url
                }
            }
        )
        res.json({
            email: profile.email,
            name: profile.name,
            photo_url: public_url,
            preferences: profile.preferences,
        })

    }
    if (file !== undefined) {
        uploadFile()
    } else {
        res.json({
            message: "not ok"
        })
    }
})

router.get(
    '/',
    auth,
    async (request, response) => {
        try {
            const profile = await User.findById(request.user.userId)
            response.json({
                name: profile.name,
                photo_url: profile.photo_url,
                email: profile.email,
                preferences: profile.preferences,
            })
        } catch (e) {
            response.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    })

router.put(
    '/',
    auth,
    async (request, response) => {
        try {
            const {name, preferences} = request.body
            const profile = await User.findOneAndUpdate(
                {_id: request.user.userId},
                {
                    $set: {
                        name: name,
                        preferences: preferences,
                    }
                }
            )
            response.json({
                email: profile.email,
                name: name,
                preferences: preferences,
            })
        } catch (e) {
            response.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

module.exports = router
