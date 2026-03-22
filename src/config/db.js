import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'wilmer',      
    password: 'Colombi@1W', 
    database: 'tiendatecnologica',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
