const express = require('express');
const mongoose = require('mongoose');
const roomsModel = require('../model/rooms'); // Provide the correct path

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

module.exports.getAllrooms = async (req,res) =>{
    try{
        const findRoom = await roomsModel.find({});
        res.status(200).json(findRoom);
    }
    catch(error){
        res.status(500).json({error:"Error Showing Rooms"})
    }  
} 

module.exports.getRoomById = async (req,res) =>{
    try{
        const findRoomById = await roomsModel.findById(req.params._id);
        if(!findRoomById){
            return res.status(404).json({error:"Room not Found"})
        }else{
            res.status(200).json(findRoomById);
            console.log("Bookng found");
        }
    }
    catch(error){
        res.status(500).json({error:"Error Showing Rooms!"})
    }
}

module.exports.createRoom = async (req, res) => {
        try {
          const booking = req.body;
          const createdRoom = await roomsModel.create(booking);
          res.status(201).json(createdRoom);
          console.log("Room added successfully");
        } catch (error) {
          console.error("Error creating booking:", error);
          res.status(500).send('Error creating booking');
        }
      }

module.exports.UpdateRoom = async (req,res) => {
    try{
        const editRoom = await roomsModel.findByIdAndUpdate(
            req.params.room_id,
            req.body,
            {new:true}
        );

        if(!editRoom){
           return res.status(404).json({error:"Room not Found"})
        }

        res.json(editRoom)    
    }
    catch(error){
        console.error('Error updating room:', error);
        res.status(500).json({ error: 'Error updating room', details: error.message });
    }
}

module.exports.getRoomsByHotel = async (req, res) => {
    try {
        const hotelName = req.params.hotelname; // Use 'hotelname' as specified in the route parameter
        const rooms = await roomsModel.find({ HotelName: hotelName });

        res.json(rooms);
    } catch (error) {
        console.error('Error fetching rooms by hotel name:', error);
        res.status(500).json({ error: 'Error fetching rooms by hotel name', details: error.message });
    }
};

module.exports.getRoomsByHotelAndLocation = async (req, res) => {
    try {
        const location = req.params.location;
        const hotelName = req.params.hotelname;
        const rooms = await roomsModel.find({ hotelName, location });

        res.json(rooms);
    } catch (error) {
        console.error('Error fetching rooms by hotel name and location:', error);
        res.status(500).json({ error: 'Error fetching rooms by hotel name and location', details: error.message });
    }
};

module.exports.getPrice = async (req, res) => {
    try {
        const location = req.params.location;
        const hotelName = req.params.hotelName;
        const roomType = req.params.roomType;

        const rooms = await roomsModel.find({ hotelName, location, roomType });

        if (rooms.length > 0) {
            res.send(rooms[0].price);
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    } catch (error) {
        console.error('Error fetching rooms by hotel name and location:', error);
        res.status(500).json({ error: 'Error fetching rooms by hotel name and location', details: error.message });
    }
};




module.exports.deleteRoom = async (req,res) => {
    try{
        const removePayment = await roomsModel.deleteOne({ _id: req.params.room_id });

        if(!removePayment){
            return res.status(404).json({error:"Room not Found"})
        }
        
        res.status(200).json({msg:"Room deleted Successfully"})
    }
   catch{
    res.status(400).json({error:"Invalid Data"})
   }
};