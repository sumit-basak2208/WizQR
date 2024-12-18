import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    url: String,
    gradientType: {
      type: String,
      enum: ["linear", "radial"],
    },
    angle: Number,
    // x,y points
    position: [Number],
    backgroundColors: [String],
    QRColors: [String],
    points: [Number],
    urlCode: {
      type: String,
      unique: true,
    },
    totalScans: {
      type: Number,
      default: 0,
    },
    controlPoints: {
      p1: { x: Number, y: Number },
      p2: { x: Number, y: Number },
    },
  },
  { timestamps: true }
);

const Cards = mongoose.models.cards || mongoose.model("cards", cardSchema);
export default Cards;
