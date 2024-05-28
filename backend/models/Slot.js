import mongoose from "mongoose";

export const slotSchema = new mongoose.Schema({
  size: String,
  isOccupied: Number,
});

const Slot = mongoose.model("Slot", slotSchema);
