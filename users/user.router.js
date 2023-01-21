const express = require("express");
const User = require("./user.model.js");
const jwt = require("jsonwebtoken");


const app = express.Router();


app.get('/' , (req , res) => {
    res.send("LIFE IS AWESOME... && welcome to users")
});
app.post("/register", async (req, res) => {
  const { name , email, password,} = req.body;
  console.log('req.body:', req.body)

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.send({ status: false, message: "User already exist!" });
  }
  // --------------------------
  try {
    const user = await User.create({
      name,
      email,
      password 
    });
    return res.send({ status: true, message: "You have signup Successfully" });
    
  } catch (error) {
    res.send(error)
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email , password});
  if (!user) {
    return res.send({ Token: "", message: "Wrong Credential!" });
  }else{

    
      const Token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          name:user.name
        },
        "SECRETKEY",
        { expiresIn: "2 days" }
      );
    
      return res.send({
        Token: Token,
        message: "You have signIn Successfully",
      });
    
  }

  // const refreshToken = jwt.sign({}, "REFRESH");
});
app.get('/getProfile/:id' , async (req , res) =>{
  const {id} =  req.params
  console.log('param', req.params)
  const user = await User.findOne({id});
  console.log('user:', user)
  res.send(user)

} )

app.post('/calculate' ,async (req , res) => {
  let {amount , year , rate} = req.body;
  console.log('req.body:', req.body);
  // Total Maturity Value(F) = P [({(1+i) ^n}-1)/i]
  let i= 1+(rate/100);
  let i1 = Math.pow(i,year);
  let i2 = (i1-1)/(rate/100);
  let i3 = Math.ceil(amount*i2)

console.log('i:', i, i1,i2 , i3);
  // let val = amount[{((1 + 0.071)**year)-1}/0.071]
  // console.log('val:', val)
  // Total Maturity Value(F) = 27,12,139 
  const maturityValue = i3;
  const amountInvested = amount*year 
  const totalInterst = maturityValue-amountInvested
  res.send({ amountInvested , totalInterst ,maturityValue })


  // res.send("hello")
})

module.exports = app;
