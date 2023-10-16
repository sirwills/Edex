
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();
const SECRET = process.env.SECRET


const auth = (req, res, next) =>{
    try {
        if(!req.headers.authorization){
            return res.status(403).json({success: false, Msg: "Unauthorized, No token!"});
        }

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
            const token = req.headers.authorization.split(" ")[1]

            jwt.verify(token, SECRET, (err, data)=>{
                if(err){
                    console.error(err)
                    return res.status(400).json({success: false, Msg: "Wrong or expired token"})
                } else {
                    req.user = data
                    next()
                }
            })
        }
    } catch (error) {
       console.error(error) 
    }
}

module.exports = auth