const dbService = require('../db/db.service');

class AuthService {

    async login(body) {
        const login = body.login,
            password = body.password;

        const dbResult = await dbService
            .selectQueryBuilder({
                from: 'users',
                where: {
                    login: login
                }
            });

        if (dbResult) {
            return {
                dbResult
            }
        }

        return {
            auth: 'error'
        }

    }
}

module.exports = new AuthService();