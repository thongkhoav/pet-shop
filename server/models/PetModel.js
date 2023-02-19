import mongoose from "mongoose";
const Schema = mongoose.Schema;
const PetSchema = new Schema(
  {
    species_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    // owner_id: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    // },
    name: {
      type: String,
      maxLength: 255,
      required: [true, "Please add the name"],
    },
    desc: {
      type: String,
      // required: [true, "Please add the description"],
    },
    images: {
      type: [Object],
      required: true,
    },
    small: { quantity: Number, price: Number },
    medium: { quantity: Number, price: Number },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Pet", PetSchema);
