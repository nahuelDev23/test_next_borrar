const  mongoose  = require("mongoose")

const MovieSchema = new mongoose.Schema({
    title: {
        type:String,
        required:[true,'El titulo es necesario']
    },
    plot: {
        type:String,
        required:[true,'El plot es necesario']
    }
})

export default mongoose.models.Movie ||  mongoose.model('Movie',MovieSchema)