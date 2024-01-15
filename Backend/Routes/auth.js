// const express = require("express");
// const User = require("../Models/User");
// const router = express.Router();
// const { body, validationResult } = require("express-validator");
// const bcrypt = require('bcryptjs')    // helps to generate a encrypted password 

// const jwt = require('jsonwebtoken') ; //it mantains a protected communication between two user
// const JWT_SECRET = 'sachinisagoodb$oy';


// //create a user using:POST "/api/auth/" . Doesnot require auth/ NO login required

// //router.get('/',(req,res)=>{

// router.post(
//   "/createuser",
//   [
//     body("name", "enter a valid name").isLength({ min: 3 }),
//     body("email", "enter a valid mail").isEmail(),
//     body("password", "password length must be at least 5 ").isLength({
//       min: 5,
//     }),
//   ],
//   async (req, res) => {
//     /*  console.log(req.body);
//    res.send("hello");

//    const user = User(req.body);
//    user.save()*/

//     //if there are errors , return bad request and the errors

//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     //Check whether the user with this email exist already

//     try {
//       let user = await User.findOne({ email: req.body.email });
//       if (user) {
//         return res
//           .status(400)
//           .json({ error: "Sorry a user with this email already exists" });
//       }
        
//       // helps to generate a  hashes/ encrypted password 
//       const salt = await bcrypt.genSalt(10);
//      const secPass = await bcrypt.hash(req.body.password , salt);

//       //create a new user 
//       user = await User.create({
//         name: req.body.name,
//         password: secPass,
//         email: req.body.email,
//       });

//       const data ={
//         user:{
//           id:user.id
//         }
//       }

     
//       const authtoken = jwt.sign(data,JWT_SECRET);
//        res.json({authtoken})
      


//       //   .then(user => res.json(user))
//       //   .catch(err=> {console.log(err)  //to print the error caused due to mutiple request sent
//       // res.json({error:'please enter a unique value for email', message: err.message})})

//       // res.json(user);

//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal server Error");
//     }
//   });

// //    res.send(req.body);

// // const obj={
// //     a:'this',
// //     number:34
// // }
// // res.json(obj)





// // 2. AUTHENTICATE  a user using:POST "/api/auth/" . Doesnot require auth/ NO login required

// router.post(
//   '/login',
//   [
//     body('email', 'enter a valid mail').isEmail(),
//     body('password', 'Password cannot be blank').exists(),
    

//   ], 
//   async (req, res) => {


// //if there are errors , return bad request and the errors

// const errors = validationResult(req);

// if (!errors.isEmpty()) {
//   return res.status(400).json({ errors: errors.array() });
// }

// const {email,password} = req.body;

// try{
//   let user = await User.findOne({email});
//   if(!user){
//     return res.status(400).json({error:"please try to login with correct credentials"});

//   }
//   const passwordCompare = await bcrypt.compare(password,user.password);
//   if(!passwordCompare){
//     return res.status(400).json({error:"please try to login with correct credentials"});

//   }
//   const data ={
//     user:{
//       id:user.id
//     }
//   }

 
//   const authtoken = jwt.sign(data,JWT_SECRET);
//    res.json({authtoken})
// }

// catch(error){
//   console.error(error.message);
//   res.status(500).send("Internal server Error");

// }

//   });

// module.exports = router;




//Harry code

const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Harryisagoodb$oy';

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success, error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);


    // res.json(user)
    success = true;
    res.json({ success,authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router