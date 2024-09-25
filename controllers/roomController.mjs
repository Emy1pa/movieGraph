import Room, { validateRoom, UpdateRoom } from "../models/Room.mjs";

export async function createRoom(req, res) {
  try {
    const { error } = validateRoom(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getRooms(req, res) {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getRoomById(req, res) {
  try {
    const room = await Room.findById(req.params.id);
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function updateTheRoom(req, res) {
  try {
    const { error } = UpdateRoom(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function deleteRoom(req, res) {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (room) {
      res.status(200).json({ message: "Room has been deleted successfully" });
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
