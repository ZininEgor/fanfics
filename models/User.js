const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    photo_url: {type: String, required: true, default: "https://firebasestorage.googleapis.com/v0/b/fanfics-ac485.appspot.com/o/Screen%20Shot%202021-07-11%20at%2018.59.39.png?alt=media&token=1fb4f39b-8914-4bdf-9331-e559bd1b01f3"},
    isFirstAuth: {type: Boolean, default: true},
    isActive: {type: Boolean, default: false},
    isSuperUser: {type: Boolean, default: false},
    preferences: [{ type: Types.ObjectId, ref: 'Fanfiction'}],
})

module.exports = model('User', schema)