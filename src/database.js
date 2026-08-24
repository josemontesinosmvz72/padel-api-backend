const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global._mongooseConnection;

if (!cached) {
    cached = global._mongooseConnection = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((m) => {
            console.log('Connected to DB');
            return m;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

connectDB().catch((err) => console.error(err));

module.exports = { mongoose, connectDB };
