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
        maxlength: [50, 'ingredients must be less than 50 characters']
    },
    recipe: {
        type: String,
        maxlength: [50, 'recipe must be less than 50 characters']
    },
    image: { 
        type: String, 
    }
})

module.exports = mongoose.model('Crud', CrudSchema)

