import mongoose from "mongoose";
const Schema = mongoose.Schema;
const OrderSchema = new mongoose.Schema(
  {
    // seller_id: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    // },
    customer_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    // note: String,
    pets: [{pet_id: Schema.Types.ObjectId, quantity: Number, size: String}],
    // stuffs: 
    //   [{stuff_id: Schema.Types.ObjectId, quantity: Number}]
    // ,
    total_price: {
      type: Number,
      required: true,
    },
    order_status: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    expected_delivery_date: {
      type: Date,
      required: true,
    },
    address:{
      type: String, // lấy theo địa chỉ user hiện tại, nếu user đổi nhà!
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
