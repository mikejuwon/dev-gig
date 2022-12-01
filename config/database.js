const Sequelize = require('sequelize');

module.exports = new Sequelize(
    process.env.DB,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.dialect,
        operatorsAliases: 0,

        pool: {
            max: process.env.pool.max,
            min: process.env.pool.min,
            acquire: process.env.pool.acquire,
            idle: process.env.pool.idle
        }
    }
);