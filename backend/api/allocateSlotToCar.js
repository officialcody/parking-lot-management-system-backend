import ParkingLot from "../models/ParkingLot.mjs";

export default async function allocateSlotToCar(req, res) {
  function findSlot(parkingLot, carSize) {
    // Check floor-wise
    for (const floor of parkingLot.floors) {
      const slotOfCarSize = floor.slots.findIndex(
        (slot) => slot.size === carSize && slot.isOccupied < 100
      );
      if (slotOfCarSize >= 0) {
        return {
          slot: floor.slots.find(
            (slot) => slot.size === carSize && slot.isOccupied < 100
          ),
          floor: floor,
        };
      }
    }
    // Check size-wise
    const slotSizes = {
      Small: ["Small", "Medium", "Large", "XLarge"],
      Medium: ["Medium", "Large", "XLarge"],
      Large: ["Large", "XLarge"],
      XLarge: ["XLarge"],
    };
    for (const floor of parkingLot.floors) {
      const slotOfCarSize = floor.slots.find((slot) => slot.size === carSize);
      for (const slotSize of slotSizes[slotOfCarSize.size]) {
        if (
          floor.slots.findIndex(
            (slot) => slot.size === slotSize && slot.isOccupied < 100
          ) >= 0
        ) {
          return {
            slot: floor.slots.find(
              (slot) => slot.size === slotSize && slot.isOccupied < 100
            ),
            floor: floor,
          };
        }
      }
    }
    return "No Slot Available";
  }
  const { carSize } = req.body;
  const parkingLot = await ParkingLot.findById(req.params.parkingLotId);
  let slotFilled = findSlot(parkingLot, carSize);
  if (slotFilled === "No Slot Available") {
    res.json({ message: "No SLOT FOUND" });
  } else {
    slotFilled.slot.isOccupied += 1;
    await parkingLot.save();
    return res.json({
      message: "Slot allocated",
      slotId: slotFilled.slot._id,
      slotNumber: `Floor ${slotFilled.floor.floorNumber} Slot ${
        slotFilled.slot.size.split("")[0] + slotFilled.slot.isOccupied
      }`,
    });
  }
}
