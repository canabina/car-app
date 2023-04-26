const authService = require('../auth/auth.service');

const authController = {

    '/auth/login': {
        method: 'POST',
        callback: function (req, res) {
            return authService.login(req.body);
        }
    },

    '/auth/logout': {
        method: 'GET',
        callback: function (req, res) {

        }
    },
}

module.exports = authController;