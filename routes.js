const authController = require('./src/domain/auth/auth.controller');

function controllerToExpress(app, controller) {
    for (const url in controller) {
        const controllerItem = controller[url];
        app[controllerItem.method.toLowerCase()](url, async (req, res) => {
            const result = await controllerItem.callback(req, res);
            if (result) {
                return res.send(result);
            }
        });
    }
}


function routes(app) {
    const controllers = [
        authController
    ];

    for (const controller of controllers) {
        controllerToExpress(app, controller);
    }
}

module.exports = routes;