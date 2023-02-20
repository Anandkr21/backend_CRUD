const express=require('express')
const {studentmodel}= require('../model/data.model')

const dataRouter=express.Router()


dataRouter.get('/', async(req,res) =>{
    const data= await studentmodel.find()
    res.send(data)
})

dataRouter.post('/admission', async(req,res) =>{
    const payload=req.body;
    const data=new studentmodel(payload)
    await data.save()
    res.send({"msg":"Thanks for taking admission"})
})

dataRouter.patch('/update/:id', async(req,res) =>{
    try {
        const id=req.params.id;
        const payload=req.body;
        await studentmodel.findByIdAndUpdate({_id:id},payload)
        res.send({"msg":`Admission with id ${id} has been updated.`})
        
    } catch (err) {
        res.send({"msg": "Something went wrong."})
    }
})

dataRouter.delete('/delete/:id', async(req,res) =>{
    const id=req.params.id;
    await studentmodel.findByIdAndDelete({_id:id})
    res.send({"msg":`Admission with id ${id} has been deleted.`})
})

module.exports={
    dataRouter
}