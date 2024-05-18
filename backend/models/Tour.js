import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
    },
    photo: {
      type: String,
      required: true,
    },
    desc: [
      {
        day: {
          type: String,
        },
        activities: [
          {
            type: String,
          },
        ],
      },
    ],
    hotel: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
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
