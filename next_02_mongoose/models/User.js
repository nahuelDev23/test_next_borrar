const  mongoose  = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: {
        type:String,
        required:[true,'El email es necesario']
    },
    password: {
        type:String,
        required:[true,'El password es necesario']
    },
    userName: {
        type:String,
        required:[true,'El userName es necesario']
    },
    admin:{
        type:String,
        default:false
    }
})

export default mongoose.models.User ||  mongoose.model('User',UserSchema)