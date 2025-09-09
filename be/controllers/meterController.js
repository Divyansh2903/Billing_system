const { default: meterServices } = require("../services/meterServices");


exports.getMeterReading = async (req, res) => {
    const fileName = req.body.fileName;
    const roomNumber = req.body.roomNumber;
    const result = await meterServices.getMeterReading(fileName, roomNumber)
    res.send(result);
}

exports.getAllRooms = async (req, res) => {
    const result = await meterServices.getAllRooms()
    res.send(result);
}