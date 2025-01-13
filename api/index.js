const express = require('express');
const app = express();
const User = require('./models/User');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secret = "s0//P4$$w0rD";
const bcryptSalt = bcrypt.genSaltSync(saltRounds);
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use(express.json());
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


app.listen(4000);