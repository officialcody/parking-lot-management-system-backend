import ParkingLot from "../models/ParkingLot.mjs";

// Create a New Parking Lot
export default async function createParkingLot(req, res) {
  const { name, address, floors } = req.body;
  let updatedfloors = [];
  if (!floors) {
    updatedfloors = [1, 2, 3].map((floor) => {
      return {
        floorNumber: floor,
        slots: [
          {
            size: "Small",
            isOccupied: 0,
          },
          {
            size: "Medium",
            isOccupied: 0,
          },
          {
            size: "Large",
            isOccupied: 0,
          },
          {
            size: "XLarge",
            isOccupied: 0,
          },
        ],
      };
    });
  } else {
    let totalFloors = floors;
    for (let i = 1; i <= totalFloors; i++) {
      updatedFloors.push({
        floorNumber: i,
        slots: [
          {
            size: "Small",
            isOccupied: 0,
          },
          {
            size: "Medium",
            isOccupied: 0,
          },
          {
            size: "Large",
            isOccupied: 0,
          },
          {
            size: "XLarge",
            isOccupied: 0,
          },
        ],
      });
    }
  }
  const parkingLot = new ParkingLot({ name, address, floors: updatedfloors });
  await parkingLot.save();
  res.json({
    message: "Parking lot created successfully",
    parkingLotId: parkingLot._id,
  });
}
