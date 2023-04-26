const config = require('../../../config');
const mysql = require("mysql2");

class DbService {

    connection;

    constructor() {
        this.connection = mysql.createConnection(config.DBConnection);
    }

    getConnection() {
        return this.connection;
    }


    selectQueryBuilder (config) {
        let sql = `
            SELECT 
                ${config.fields && config.fields.length ? config.fields.join(', ') : '*'}
            FROM
                ${config.from}
            ${
                config.where 
                    ? `
                        WHERE
                        ${Object.entries(config.where).map(([key, value]) => `${key} = "${value}"`).join(' AND ')}
                    `
                    : ''
            }
                
            ORDER BY
                ${config.order ? config.order : 'id ASC'}
                
            LIMIT
                ${config.limit ? config.limit : '100'}
        `;

        return new Promise((resolve, reject) => {
            this.getConnection().query(sql, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            })
        })
    }

}

module.exports = new DbService();