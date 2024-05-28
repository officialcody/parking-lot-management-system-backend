import ParkingLot from "../models/ParkingLot.mjs";

export default async function deallocateSlotFromCar(req, res) {
  const { slotNumber } = req.body;
  function getSlotSize(initial) {
    if (initial === "S") {
      return "Small";
    } else if (initial === "M") {
      return "Medium";
    } else if (initial === "L") {
      return "Large";
    } else if (initial === "X") {
      return "XLarge";
    }
  }
  let slotString = slotNumber.split(" ");
  let floorNumber = slotString[1];
  let slotSize = getSlotSize(slotString[3].split("")[0]);
  const parkingLot = await ParkingLot.findById(req.params.parkingLotId);

  const floor = parkingLot.floors[floorNumber - 1];
  const slotToBeFreed = floor.slots.find((slot) => slot.size === slotSize);
  try {
    if (slotToBeFreed && slotToBeFreed.isOccupied > 0) {
      slotToBeFreed.isOccupied -= 1;
      await parkingLot.save();
      return res.json({ status: 200, message: "Slot Freed" });
    } else {
      return res.json({ status: 400, message: "No Car found on this Slot" });
    }
  } catch (e) {
    return res.json({
      status: 500,
      message: "Something went wrong",
      error: e,
    });
  }
}
