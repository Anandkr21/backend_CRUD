const mongoose=require('mongoose')

const studentSchema=({
    name:String,
    course:String,
    fee:Number,
    year:Number
})

const studentmodel=mongoose.model('student',studentSchema)

module.exports={
    studentmodel
}