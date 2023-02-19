import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const SpeciesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("species", SpeciesSchema);
