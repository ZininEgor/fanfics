const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    user: {type: Types.ObjectId, ref: 'User'},
    fanfic: {type: Types.ObjectId, ref: 'Fanfic'},
    user_name: {type: String, required: true},
    photo: {type: String, required: true, default: "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"},
    body: {type: String, required: true},
})

module.exports = model('Comment', schema)