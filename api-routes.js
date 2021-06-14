// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome',
    });
});
// Import user controller
var userController = require('./controller/userController');
// User routes
router.route('/tasks')
    .post(userController.loginRequired, userController.profile);
router.route('/auth/register')
    .post(userController.register);
router.route('/auth/sign_in')
    .post(userController.sign_in);
router.route('/user')
    .get(userController.index)
    .post(userController.new);
router.route('/user/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);



// Import user controller
var recipeController = require('./controller/recipeController');
// User routes
router.route('/recipe')
    .get(recipeController.index)
    .post(recipeController.new);
router.route('/recipe/:recipe_id')
    .get(recipeController.view)
    .patch(recipeController.update)
    .put(recipeController.update)
    .delete(recipeController.delete);
// Export API routes
module.exports = router;