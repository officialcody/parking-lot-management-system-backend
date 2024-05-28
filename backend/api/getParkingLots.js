import ParkingLot from "../models/ParkingLot.mjs";

export default async function getParkingLots(request, response) {
  const parkingLots = await ParkingLot.find({});
  if (parkingLots) {
    response.json({ status: 200, parkingLots });
  } else {
    response.json({ status: 400, message: "No parking Lots Available" });
  }
}
