const express = require('express');
const app = express();
const User = require('./models/User');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secret = "s0//P4$$w0rD";
const bcryptSalt = bcrypt.genSaltSync(saltRounds);
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use(express.json());
app.use(cookieParser());
mongoose.connect('mongodb+srv://booking:test@booking.utkk5.mongodb.net/?retryWrites=true&w=majority&appName=booking')

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
   try{
     const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
   }catch(err){
    res.status(422).json(err);
   }
});

app.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    console.log(email,password);
    const userDoc = await User.findOne({email:email});
    console.log(userDoc);
    if(userDoc){
        if(bcrypt.compareSync(password,userDoc.password)){
            const token = jwt.sign({email:userDoc.email,id:userDoc._id},secret,{},(err,token)=>{
                if(err){
                    res.status(422).json({message:'Login failed, please try again later'})
                }
                res.cookie('token',token).json(userDoc)
            })
        }else{
            res.status(422).json({message:'Login failed, please try again later'})
        }
    }
    else{
        res.status(422).json({message:'Login failed, please try again later'})
    }

})

app.get('/profile', (req,res)=>{
    const token = req.cookies.token;
    if(token){
        jwt.verify(token,secret,{},async (err,userData)=>{
            if(err) throw err;
            const userDoc = await User.findById(userData.id);
            res.json(userDoc);
        })
    }else{
        res.json(null);
    }
})


app.listen(4000);