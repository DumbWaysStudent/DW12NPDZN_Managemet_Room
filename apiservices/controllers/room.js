const multer = require('multer')
const moment = require('moment');
const models = require('../models')


const User = models.user
const Room = models.room
const Order = models.order
const Customer = models.customer

const ip = `http://192.168.43.122:4001/`

exports.roomIndex = (req,res) => {
    Room.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']}
    }).then(room=>res.send(room))
}

exports.roomStore = (req,res) => {
    Room.create({
        name: req.body.name
    })
    .then(room=>{res.send({
        data: {
            id: room.id,
            name: room.name
        },
        message: "Success"
    })})
}

exports.roomUpdate = async (req,res) => {
    await Room.update({
        name: req.body.name
    },
    {where: 
        {id: req.params.roomId
      }})
    Room.findAll({
      attributes: {exclude: ['createdAt', 'updatedAt']}
    }).then(room=>res.send(room))
}


exports.customerIndex = (req,res) => {
    Customer.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']}
    }).then(customer=>res.send(customer))
}

exports.customerStore = (req,res) => {
    Customer.create({
        name: req.body.name,
        identity_number:req.body.identity_number,
        phone_number: req.body.phone_number,
        image: ip + req.file.path
    })
    .then(customer=>{res.send({
        data: {
            id: customer.id,
            name: customer.name,
            identity_number: customer.identity_number,
            phone_number: customer.phone_number,
            image: ip + req.file.path
        },
        message: "Success"
    })})
}

exports.customerUpdate = async (req,res) => {
    await Customer.update({
        name: req.body.name,
        identity_number:req.body.identity_number,
        phone_number: req.body.phone_number,
        image: ip + req.file.path,
	
    },
    {where: 
        {id: req.params.customerId
      }})

    Customer.findAll({
      attributes: {exclude: ['createdAt', 'updatedAt']}
    }).then(customer=>res.send(customer))
}


exports.orderRoomIndex = (req,res) => {
    Room.findAll({
        include: [
            {
                model: Customer,
                attributes: {exclude: ['createdAt', 'updatedAt']},
                through: {
                    model: Order,
                    where: {is_done: false},
                    attributes: {exclude: ['createdAt', 'updatedAt']}
                }     
            }
        ],
        attributes: {exclude: ['createdAt', 'updatedAt']}  
    }).then(order=>{res.send(order)})
}

// exports.orderStore = (req,res) => {
//     Order.create({
//         room_id: req.body.room_id,
//         customer_id: req.body.customer_id,
//         is_done: false,
//         is_booked: true,
//         duration: req.body.duration,
//         order_end_time: moment().add(req.body.duration, 'minutes')
//     })
//     .then(order=>{res.send({
//         order,
//         message: "Success"
//     })})
// }

exports.orderRoomStore = async (req,res) => {
  await Order.create({
        room_id: req.body.room_id,
        customer_id: req.body.customer_id,
        is_done: false,
        is_booked: true,
        duration: req.body.duration,
        order_end_time: moment().add(req.body.duration, 'minutes')
  }) 
      Room.findAll({
        include: [
          {
            model: Customer,
            attributes: {exclude: ['createdAt', 'updatedAt']},
            through: {
              model: Order,
              where: {is_done: false},
              attributes: {exclude: ['createdAt', 'updatedAt']}
            }     
          }
        ],
        attributes: {exclude: ['createdAt', 'updatedAt']}  
      }).then(order=>{res.send(order)})   
}

// exports.orderUpdate = (req,res) => {
//     Order.update({
//         room_id: req.body.room_id,
//         customer_id: req.body.customer_id,
//         is_done: true,
//         is_booked: false,
//         duration: req.body.duration,
//         order_end_time: moment().add(req.body.duration, 'minutes')
//     },
//     {where: 
//         {id: req.params.orderId
//       }})
//     .then(order=>{res.send({
//         message: "Success"
//     })})
// }

exports.orderRoomUpdate = async (req,res) => {
  await Order.update({
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
  
  Room.findAll({
    include: [
      {
        model: Customer,
        attributes: {exclude: ['createdAt', 'updatedAt']},
        through: {
          model: Order,
          where: {is_done: false},
          attributes: {exclude: ['createdAt', 'updatedAt']}
        }     
      }
    ],
    attributes: {exclude: ['createdAt', 'updatedAt']}  
  }).then(order=>{res.send(order)})   

}
