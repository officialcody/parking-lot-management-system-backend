import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connect from "./db/connection.js";
import createParkingLot from "./api/createParkingLot.js";
import allocateSlotToCar from "./api/allocateSlotToCar.js";
import deallocateSlotFromCar from "./api/deallocateSlotFromCar.js";
import getParkingLots from "./api/getParkingLots.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Cluster
connect();
// Get all Paking Lots
app.get("/getParkingLots", getParkingLots);

// Create a new parking lot
app.post("/createParkingLot", createParkingLot);

// Allocate a slot to a car
app.post("/allocateSlot/:parkingLotId", allocateSlotToCar);

// Deallocate a slot from a car
app.post("/deallocateSlot/:parkingLotId", deallocateSlotFromCar);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
