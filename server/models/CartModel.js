import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const CartSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    cart:  [{pet_id: {type: Schema.Types.ObjectId, unique: true}, _id: false }],
    
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
