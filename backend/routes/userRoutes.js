const router = require('express').Router();
const User = require('../models/userSchema')

router.post("/signup",async(req,res)=>{
    //console.log(req.body)
    const {name,email,password} = req.body

    try {
       const user = await User.create({name,email,password})
       res.status(201).json(user)
    } catch (err) {
      if(err.code === 11000) return res.status(400).send("email already exists")
        res.status(400).send(err.message)     
    }
})

router.post("/login",async(req,res)=>{
    const {email,password} = req.body

    try {
       const user = await User.findByCredentials(email,password)
       res.json(user)
    } catch (err) {
      res.status(400).send(err.message)     
    }
})

router.get("/",async(req,res)=>{
  try {
    const users = await User.find({isAdmin:false}).populate('orders')
    res.json(users)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

module.exports = router