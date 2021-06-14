// recipeModel.js
var mongoose = require('mongoose');
// Setup schema
var recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
// Export Recipe model
var Recipe = module.exports = mongoose.model('recipe', recipeSchema);
module.exports.get = function (callback, limit) {
    Recipe.find(callback).limit(limit);
}