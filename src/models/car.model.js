import mongoose, { Schema } from "mongoose";

const carSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      validate: [arrayLimit, '{PATH} exceeds the limit of 10'],
    },
    tags: {
      carType: String,
      company: String,
      dealer: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length <= 10;
}

export const Car = mongoose.model("Car", carSchema);
