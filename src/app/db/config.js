import mysql from 'mysql2';


let db;

try {
    db = mysql.createConnection({       
        user: process.env.NEXT_DB_USER,
        password: process.env.NEXT_DB_PASSWD,
        port: process.env.NEXT_DB_PORT,
        database: process.env.NEXT_DB
    });
} catch(err) {
     console.error('Database connection error : ', err);
}

export default db;
