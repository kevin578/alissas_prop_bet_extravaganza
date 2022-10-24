module.exports = class CreateUserTable1666452294813 {

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE users (
        id serial PRIMARY KEY,
        email VARCHAR ( 255 ) UNIQUE NOT NULL,
        password VARCHAR ( 50 ) NOT NULL,
        created_on TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      );`);
  }

  async down(queryRunner) {
    await queryRunner.query(
      `DROP TABLE users;`
    )
  }

}
