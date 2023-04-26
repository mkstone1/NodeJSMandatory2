import db from "./connection.js";
import bcrypt from "bcrypt";

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

if (isDeleteMode) {
    db.exec(`DROP TABLE users;`);
}

// (DDL)
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    role TEXT
);
`);


const passwordPlaintext = "test";
const encryptedPassword = await bcrypt.hash(passwordPlaintext, 12);


// Seeding (DML)
if (isDeleteMode) {
    db.exec(`INSERT INTO users (username, password) VALUES ('hunter42', '$2b$12$Lh2SWODr9bJZwPK3zv5kpOPb9m5RHMdrQlNeQwg/ahGF35ZGW.uHa');`);
    db.exec(`INSERT INTO users (username, password) VALUES ('asd', '${encryptedPassword}');`);
    db.exec(`INSERT INTO users (username, password, role) VALUES ('test', '${encryptedPassword}', 'admin');`);
}