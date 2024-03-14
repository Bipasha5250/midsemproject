import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;
const db=new pg.Client(
  {
    user:"postgres",
    host:"localhost",
    database:"secrets",
    password:"Bipasha@1234",
  }
);
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/Submit", (req, res) => {
    res.render("register.ejs");
  });
  app.post("/Submit",(req,res)=>{
    res.send("finally noc form submited");
  });
app.get("/Submit", (req, res) => {
    res.render("register.ejs");
  });
  app.post("/Submit",(req,res)=>{
    res.send("finally noc form submited");
  });
  
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  