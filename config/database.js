const Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.DB_URI, null, null, {
    dialect: 'postgres',
    OperatorAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
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

