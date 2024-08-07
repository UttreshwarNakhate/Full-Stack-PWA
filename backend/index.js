const express = require("express");
const multer = require("multer");
const mongoose = require('mongoose');
const { ImageModel } = require("./model/image-model");
const cors = require('cors')
const path = require('path')

const app = express();
app.use(express.json());
app.use(cors())
app.use(express.static('uploads'));


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });


// Route to inset data in database
app.post("/single", upload.single("image"), async(req, res) => {
  console.log(req.file);

  try {
    const {path, filename} = req.file
    const { name, mobile, email, age, qualification, address } = req.body;
      // const image = await ImageModel({path, filename})


  const image = new ImageModel({
    name,
    mobile,
    email,
    age,
    qualification,
    address,
    image: {
      path,
      filename
    }
  });

  await image.save()
  res.send({"msg":"Image uploaded sucessfully..."})
    
  } catch (error) {
    console.log("Error occured: ", error)
  }
});

// Define route to fetch data from database
app.get('/users', async(req, res)=>{
  const {id} = req.params

  try {
    const users = await ImageModel.find({});
    res.json(users);


      console.log("users: ", users)

      // if(!image) res.send({"msg":"Image not found!"})

      // const imagePath = path.join(__dirname, "uploads", image.filename)
      // console.log("imagePath: ", imagePath)

      
  } catch (error) {
    res.send({"Error":"Unable to get users"})
  }
})


app.listen(8000, async () => {
  try {
    await mongoose.connect("mongodb+srv://uttreshwarnakhate:answer123@cluster0.4ng3e.mongodb.net/users");

    console.log("database is connected:");
  } catch (error) {
    console.log("Error occured: ", error);
  }
});
