const jwt = require('jsonwebtoken')
const models = require('../models')
const User = models.user

const ip = `http://192.168.43.122:5001/`


exports.login = (req, res)=>{    

  const email = req.body.email
  const password = req.body.password

  User.findOne({where: {email, password}}).then(user=>{
    if(user){
      const token = jwt.sign({ userId: user.id }, 'my-secret-key')
      res.send({
        user,
        token
      }) 
    }else{
      res.send({
        message: "Wrong Email or Password!"
      })
    }
  })
}

exports.show = (req,res) =>{
  User.findOne({where: {id : req.params.id}}).then(user=>{
      res.send(user)
      })
}



