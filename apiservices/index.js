require('express-group-routes')
const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')

const app = express()
const port = Number (process.env.PORT || 4001)

//multer
const Storage = multer.diskStorage({
	destination(req, file, callback) {
	console.log(__dirname)
	  callback(null, __dirname+'/images')
	},
	filename(req, file, callback) {
	  callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
	},
  })
  
const upload = multer({ storage: Storage })

app.use(bodyParser.json())
app.use('/images',express.static('images'));


//import controllers
const AuthController = require('./controllers/auth')
const RoomController = require('./controllers/room')


//middleware
const { authenticated } = require('./middleware')

app.group("/api/v1", (router) => {

	router.post('/login', AuthController.login)
	router.get('/user/:id', authenticated, AuthController.show)

	router.get('/rooms', authenticated, RoomController.roomIndex)
	router.post('/room', authenticated, RoomController.roomStore)
	router.put('/room/:roomId', authenticated, RoomController.roomUpdate)

	router.get('/customers', authenticated, RoomController.customerIndex)
	router.post('/customer', authenticated, RoomController.customerStore)
	router.put('/customer/:customerId', authenticated, RoomController.customerUpdate)

	router.get('/checkin', authenticated, RoomController.orderRoomIndex)
	router.post('/checkin', authenticated, RoomController.orderRoomStore)
	router.put('/order/:orderId', authenticated, RoomController.orderUpdate)

})

app.listen(port, () => console.log(`Listening on port ${port}!`))
