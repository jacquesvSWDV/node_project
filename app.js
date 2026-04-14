const express = require("express");
const app = express();

const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 8000;
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 12,
  message:"You doin too much brotha, take a chill pill on the refresh button, jerk.."
});

async function throttling(req, res, next){
  try {
    setTimeout(() =>{
      next();
    }, 1000);

  } catch(error) {
    console.error(error);
  }
}

//view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//global middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(throttling);
app.use(limiter);
app.use(userRoutes);
app.use(authRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//route handler
app.get("/", (req, res) => {
  res.send("Hello World!");
});


//put in browser localhost:8000/json-response
app.get('/json-response', (req, res) =>{
  const data = {
    name: "John Doe",
  }
   res.json(data);
})



//connect
mongoose
  .connect(uri)
  .then(async () => {
    console.log("Connected to MongoDB");

    //server setup
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to MongoDB: ${err}`);
  });
