import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    distance: {
      type: Number,
      min: 0,
    },
    photo: {
      type: String,
      default: "", // Default to an empty string if no photo is provided
    },
    desc: [
      {
        day: {
          type: String,
          required: true,
        },
        activities: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
    hotel: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    maxGroupSize: {
      type: Number,
      required: true,
      min: 1,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
