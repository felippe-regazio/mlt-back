import * as dotenv from 'dotenv';
dotenv.config();
import mongoose, { Connection, ConnectOptions } from 'mongoose';

mongoose.connect(process.env.MONGO_DATABSE_URL as string, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	socketTimeoutMS: 1800000,
} as ConnectOptions);

const db: Connection = mongoose.connection;
db.on('error', console.error);
module.exports = db;