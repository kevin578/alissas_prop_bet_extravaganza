const { DataSource } = require("typeorm");

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    database: "alissapropbet",
    entities: [__dirname + "/../models/*.js"],
    logging: true,
    migrations: ["./migrations/*.js"],
    synchronize: true
});

module.exports = {dataSource}

