const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    user: {type: Types.ObjectId, ref: 'User'},
    user_name: {type: String, required: true},
    title: {type: String, required: true},
    body: {type: String, required: true},
    url_photo: {type: String, required: true, default: "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"},
    liked: [{type: Types.ObjectId, ref: 'User'}],
    dis_liked: [{type: Types.ObjectId, ref: 'User'}],
    raiting: {type: String, required: true, default: "0"},
    fanfiction: {type: Types.ObjectId, ref: 'Fanfiction'},
})
schema.index({title: 'text', body: 'text'});
module.exports = model('Fanfic', schema)