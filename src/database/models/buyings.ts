import mongoose from 'mongoose';

const BuyingsSchema = new mongoose.Schema({
	payment: { type:Object },
  userId: { type: mongoose.Types.ObjectId }
});

export default mongoose.model('buyings', BuyingsSchema);