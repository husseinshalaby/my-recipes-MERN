const mongoose = require('mongoose');


const CrudSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Provide A name'],
        trim: true,
        maxlength: [50, 'name must be less than 50 characters']
    },
    ingredients: {
        type: String,
        // require: [true, 'Provide A ingredients'],
        maxlength: [50, 'ingredients must be less than 50 characters']
    },
    recipe: {
        type: String,
        // require: [true, 'Provide A recipe'],
        maxlength: [50, 'recipe must be less than 50 characters']
    },
    image: { 
        type: String, 
        // required: true 
    }
})

module.exports = mongoose.model('Crud', CrudSchema)

// const mongoose = require('mongoose');


// const CrudSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         require: [true, 'Provide A name'],
//         trim: true,
//         maxlength: [50, 'Name must be less than 50 characters']
//     },
//     comment:String,
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// module.exports = mongoose.model('Crud', CrudSchema)