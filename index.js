const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//routes
const userRoutes = require('./routes/user.routes');

// Initialize Express app
const server = express();

// Load environment variables from .env file
dotenv.config();

const databaseURI = process.env.MONGO_ATLAS_URI ? process.env.MONGO_ATLAS_URI : process.env.MONGO_LOCAL_URI;

// Database name (can be provided separately or included in the connection string)
const databaseName = process.env.MONGO_DB_NAME || undefined;

//connect to MongoDB; if databaseName is provided, pass it as an option so you can override the DB name
mongoose.connect(databaseURI, databaseName ? { dbName: databaseName } : {})
    .then(() => {
        console.log(`Connected to MongoDB${databaseName ? ` (db: ${databaseName})` : ''}`);
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Middleware
server.use(express.json());

server.use('/user', userRoutes);

server.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Discussion Forum Server is running on ${process.env.HOST}:${process.env.PORT}`);
});