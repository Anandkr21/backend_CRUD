const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const {usermodel}=require('../model/user.model')
const userRouter=express.Router()


userRouter.post('/register', async(req,res) =>{
    const {name,email,password} =req.body;
    try {
        bcrypt.hash(password, 4, (err, hash) => {
            if (err) {
                res.send({"msg":"Something went wrong", "error":err.message})
            } else {
                const user= new usermodel({name,email,password:hash})
                user.save()
                res.send({"msg":"Registerd Successfully."})
            }
        });
    } catch (err) {
        res.send({"msg":"Something went wrong", "error":err.message})
    }
})

userRouter.post('/login', async(req,res) =>{
    const {email,password} = req.body;
    try {
        const user = await usermodel.find({email})
        if (user.length>0) {
            bcrypt.compare(password,user[0].password, (err,result) =>{
                if(result){
                    let token=jwt.sign({userid:user[0]._id}, 'anand')
                    res.send({'msg':"Login Successfully", 'token':token})
                }else{
                    res.send({"msg":'something wrong'})
                }
            })
        } else {
            res.send({"msg":'something wrong'})
        }
    } catch (err) {
        res.send({"msg":'something wrong', 'error':err.message})
    }
})

module.exports={
    userRouter
}


