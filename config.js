const config = {
    DBConnection: {
        user: process.env.DBUser || 'root',
        password: process.env.DBPassword || '',
        database: process.env.DBName,
        host: process.env.DBHost || '127.0.0.1'
    },
    app: {
        port: process.env.APP_PORT || 4000,
        welcomeMessage: (config) => `Server is running on: ${config.app.port}`
    }
};

module.exports = config;