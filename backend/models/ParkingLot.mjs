import { floorSchema } from "./Floor.js";
import mongoose from "mongoose";

export const parkingLotSchema = new mongoose.Schema({
  name: String,
  address: String,
  floors: [floorSchema],
});

const ParkingLot = mongoose.model("ParkingLot", parkingLotSchema);

export default ParkingLot;
