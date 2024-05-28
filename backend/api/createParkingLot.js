import ParkingLot from "../models/ParkingLot.mjs";

// Create a New Parking Lot
export default async function createParkingLot(req, res) {
  function getUpdatedFloors(floors) {
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
      let totalFloors = parseInt(floors);
      for (let i = 1; i <= totalFloors; i++) {
        updatedfloors.push({
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
    return updatedfloors;
  }
  const { name, address, floors } = req.body;
  try {
    const parkingLot = await ParkingLot.create({
      name,
      address,
      floors: getUpdatedFloors(floors),
    });
    res.json({
      status: 200,
      message: "Parking lot created successfully",
      parkingLotDetails: parkingLot,
    });
  } catch (e) {
    res.json({
      status: 400,
      message: "Something went wrong",
      error: e,
    });
  }
}
