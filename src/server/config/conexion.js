const {Pool } = require("pg")

const pool = new Pool ({
    user:"nnjtfnrd",
    host:"chunee.db.elephantsql.com",
    database:"nnjtfnrd",
    password:"48tBtjs3fG4KBAw8kLxlJwlQj0HCtob1",
    port: 5432,
});

module.exports = pool; 