const Sequelize = require('sequelize');
const pg = require('pg');

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectModule: pg,
    OperatorAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});

// process.env.DB,
//     process.env.USER,
//     process.env.PASSWORD,
//     {
//         host: process.env.HOST,
//         dialect: process.env.dialect,
//         operatorsAliases: 0,

//         pool: {
//             max: process.env.pool.max,
//             min: process.env.pool.min,
//             acquire: process.env.pool.acquire,
//             idle: process.env.pool.idle
//         }
//     }

