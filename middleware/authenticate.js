const jwt=require('jsonwebtoken')

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if (token) {
        jwt.verify(token,'anand', (error,decoded) =>{
            if(decoded){
                req.body.user.decoded.userid
                next()
            }else{
                res.send({"msg":"Please Login First"})
            }
        })
    } else {
        res.send({"msg":"Please Login First"})
    }
}

module.exports={
    authenticate
}