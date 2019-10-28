const multer = require('multer')
const moment = require('moment');
const models = require('../models')


const User = models.user
const Room = models.room
const Order = models.order
const Customer = models.customer

exports.roomIndex = (req,res) => {
    Room.findAll().then(room=>res.send(room))
}

exports.roomStore = (req,res) => {
    Room.create({
        name: req.body.name
    })
    .then(room=>{res.send({
        room,
        message: "Success"
    })})
}

exports.roomUpdate = (req,res) => {
    Room.update({
        name: req.body.name
    },
    {where: 
        {id: req.params.roomId
      }})
    .then(room=>{res.send({
        message: "Success"
    })})
}

exports.customerIndex = (req,res) => {
    Customer.findAll().then(customer=>res.send(customer))
}

exports.customerStore = (req,res) => {
    Customer.create({
        name: req.body.name,
        identity_number:req.body.identity_number,
        phone_number: req.body.phone_number,
        image: req.body.image
    })
    .then(customer=>{res.send({
        customer,
        message: "Success"
    })})
}

exports.customerUpdate = (req,res) => {
    Customer.update({
        name: req.body.name,
        identity_number:req.body.identity_number,
        phone_number: req.body.phone_number,
        image: req.body.image
    },
    {where: 
        {id: req.params.customerId
      }})
    .then(customer=>{res.send({
        message: "Success"
    })})
}

exports.orderIndex = (req,res) => {
    Order.findAll({
        where: {is_done : false },
        include: [
            {
                model: Room,
                as: 'roomId',
            },{
                model: Customer,
                as: 'customerId'
            }]  
    }).then(order=>res.send(order))
}

exports.orderRoomIndex = (req,res) => {
    Room.findAll({
        include: 
            {
                model: Customer,
                as: 'customer',   
                attributes: {exclude: ['createdAt', 'updatedAt']},
                through: {
                    model: Order,
                    where: {is_done: false},
                    attributes: {exclude: ['createdAt', 'updatedAt']},
                }     
            },
        attributes: {exclude: ['createdAt', 'updatedAt']},            
    }).then(order=>{res.send(order)})
}

exports.orderStore = (req,res) => {
    Order.create({
        room_id: req.body.room_id,
        customer_id: req.body.customer_id,
        is_done: false,
        is_booked: true,
        duration: req.body.duration,
        order_end_time: moment().add(req.body.duration, 'minutes')
    })
    .then(order=>{res.send({
        order,
        message: "Success"
    })})
}

exports.orderUpdate = (req,res) => {
    Order.update({
        room_id: req.body.room_id,
        customer_id: req.body.customer_id,
        is_done: true,
        is_booked: false,
        duration: req.body.duration,
        order_end_time: moment().add(req.body.duration, 'minutes')
    },
    {where: 
        {id: req.params.orderId
      }})
    .then(order=>{res.send({
        message: "Success"
    })})
}