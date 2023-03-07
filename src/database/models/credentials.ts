import mongoose from 'mongoose';

const CredentialsSchema = new mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, select: false },
	firstName: { type: String },
	lastName: { type: String }
});

export default mongoose.model('credentials', CredentialsSchema);