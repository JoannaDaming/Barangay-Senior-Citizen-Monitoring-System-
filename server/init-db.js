const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDB() {
    console.log('Starting database initialization...');
    
    // Create connection without selecting a database first
    const connectionConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD === undefined ? '' : process.env.DB_PASSWORD
    };

    console.log(`Connecting to MySQL as user: ${connectionConfig.user}...`);

    let connection;
    try {
        connection = await mysql.createConnection(connectionConfig);
        console.log('Connected to MySQL server successfully.');

        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Split by semicolon and filter out empty strings
        const statements = schema.split(';').map(s => s.trim()).filter(s => s.length > 0);

        for (const statement of statements) {
            console.log(`Executing statement starting with: ${statement.substring(0, 30)}...`);
            await connection.query(statement);
        }

        console.log('Database and tables initialized successfully.');
    } catch (error) {
        console.error('CRITICAL ERROR during database initialization:');
        console.error('Error Code:', error.code);
        console.error('Message:', error.message);
        
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('\n--- TROUBLESHOOTING TIP ---');
            console.error('MySQL rejected your username/password.');
            console.error('1. If using XAMPP, usually user is "root" and password is empty.');
            console.error('2. Check your .env file and ensure DB_USER and DB_PASSWORD are correct.');
            console.error('3. Make sure MySQL service is RUNNING in your XAMPP/WAMP panel.');
        }
    } finally {
        if (connection) await connection.end();
    }
}

initDB();
