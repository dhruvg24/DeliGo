// we type node index.js so that if any changes are made will be reflected
// console.log("backend")

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require('stripe')


// now api create
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
// need to set limit bcoz the profile photo maybe of this size
// express.json() because the data we need should be in JSON format

const PORT = process.env.PORT || 8080;
// this is needed bcoz sometimes error created while accessing port number during hosting of the website

// mongodb connection
// console.log(process.env.MONGODB_URL)
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

// schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

// model
const userModel = mongoose.model("user", userSchema);

// api
app.get("/", (req, res) => {
  res.send("Server is running");
});

// api signup
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  // need to first check whether the email is present in the database
  const { email } = req.body;
  // findOne is a method in mongoose
//   if avail then will give response
  userModel
    .findOne({ email: email })
    .then((result) => {
      if (result) {
        return res.send({ message: "Email ID already registered", alert:false });
      } else {
        const data = userModel(req.body);
        const save = data.save();
        return save.then(() => {
          res.send({ message: "Successfully Signed Up" , alert: true});
        //   if successfully signed up then redirected to login page
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "An error occurred" });
    });
  // if avail then give in result or else give err
  // if email id not avail will give null
});

// api login
app.post("/login", (req, res)=>{
    // coming from frontend
    // console.log(req.body)

    // check if email in database
    // extract email
    const {email} = req.body
    userModel.findOne({email: email}).then((result)=>{
        if(result){
            // console.log(result)
            // it will also give the password -> to avoid it manually extract the things
            const dataSend = {
                // this we can get from console, what to be extracted
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image
            }
            console.log(dataSend)
            res.send({message: "Login is successfull!", alert: true, data : dataSend})
        } else {
            res.send({message: "Email unavailable, Pls Sign Up!", alert: false})
        }
    })    
})

// product upload section API
// create schema
const schemaProduct = mongoose.Schema({
    name: String, 
    category: String,
    image: String, 
    price: String, 
    description: String
})
const productModel = mongoose.model("products", schemaProduct)
//uploading the product in database for API
app.post("/uploadProduct", async(req, res)=>{
    // console.log(req.body)
    // to send data to mongoDB
    const data = await productModel(req.body)
    const dataSave = await data.save()
    res.send({message:"Uploaded successfully"})
})

// fetching all data 
app.get("/product", async(req, res)=>{

  const data = await productModel.find({})
  // since images are stored as base64 -> very large output
  res.send(JSON.stringify(data))
  // res.send("server is running")
  // check in localhost:8080/product
})


// ********payment gateway -> stripe******
// console.log(process.env.STRIPE_SECRET_KEY)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
app.post("/checkout-payment",async(req, res)=>{
  // post since we need to get data from frontend
  // console.log(req.body)
  // res.send({message: "payment gateway ", success:true})
  
  try {
    const params = {
      // paramters
      submit_type:'pay',
      mode: "payment", 
      payment_method_types : ['card'],
      billing_address_collection: "auto",
      // shipping rate of 50 rs. for 1 hr-1 day
      shipping_options: [{shipping_rate:"shr_1NboWLSGrWesMTtGEGQPZNM7"}],
      // for cart items
      line_items: req.body.map((item)=>{
        return {
          price_data:{
            currency:"inr",
            product_data: {
              name: item.name, 
              // images: [item.image]
              // image was creating problem
            },
            unit_amount: item.price*100,

          },
          adjustable_quantity : {
            enabled: true, 
            minimum : 1,
          },
          quantity : item.qty
        }
      }),
      // if successful payment redirect to some other page -> added in .env file
      // success page created
      success_url: `${process.env.FRONTEND_URL}/success`, 
      cancel_url : `${process.env.FRONTEND_URL}/cancel`
    }
    const session = await stripe.checkout.sessions.create(params)
    // to get the details
    // console.log(session)
    res.status(200).json(session.id)
  } catch (err) {
    res.sendStatus(err.statusCode || 500).json(err.message)
  }

})


app.listen(PORT, () => console.log("server is running on port : " + PORT));
