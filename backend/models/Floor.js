import { slotSchema } from "./Slot.js";
import mongoose from "mongoose";

export const floorSchema = new mongoose.Schema({
  floorNumber: Number,
  slots: [slotSchema],
});

const Floor = mongoose.model("Floor", floorSchema);
