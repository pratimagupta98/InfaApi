const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const mongoose = require("mongoose");
//const cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//require

const admin = require("./routes/admin")
const bgImage = require("./routes/bgImage")
const user = require("./routes/user")
const infPlan = require("./routes/infPlan")
const bmiPlan = require("./routes/bmiPlan")
const agent = require("./routes/agent")



//use
app.use("/", admin);
app.use("/", bgImage);
app.use("/", user);
app.use("/", infPlan);
app.use("/", bmiPlan);
app.use("/", agent);



app.get("/", (req, res) => {
  res.send("Hello World!");
});

//console.log(process.env.DB);
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED SUCCEFULLY");
  })
  .catch((error) => {
    console.log(error);
  });


app.listen(process.env.PORT || 8000, () => {
  console.log("Example app listening on port 8000");
});

//    http://localhost:5000/admin
