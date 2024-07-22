const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const User = require('../models/User');
const auth = require('../middleware/auth');
// Register a new user
router.post('/register', register);

// Login a user
router.post('/login', login);

router.get("/get-user",auth,async(req,res)=>{
    const user=req.user;
    const isUser=await User.findOne({_id:user.id});
    try{
        if(!isUser){
            return res.sendStatus(401);
        }
        else if(isUser){
            return res.json({
                user:{email:isUser.email,"_id":isUser.id}
            })
        }
    }
    catch(error){
        res.status(500).send({error:error.message,message:'Internal Server error'});
    }
    
   
   
})

module.exports = router;
