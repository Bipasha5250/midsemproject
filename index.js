import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import multer from "multer";

import fs from "fs";
// const PDFJS = require('pdfjs-dist/es5/build/pdf');
const app = express();
const port = 3000;



const fileStorageEngine=multer.diskStorage({ 
  destination: (req,file,cb)=>{
    cb(null,"./public/images");
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+"--"+file.originalname);
  }
  });
  const upload=multer({storage:fileStorageEngine});

   

// app.post("/Submit",async (req,res)=>{
//   let  Documents=req.body.documents;
//   let sbu_name=req.body.SBU_NAME;
//  let noc_requested_by=req.body.NOC_Requested_By;
// let Emp_no = req.body.employee_no;
// let Emp_name=req.body.employee_name;
// let  select =req.body.reason;
// let  radio  =req.body.flexRadioDefault;
// let   DATE =req.body.entry;
// let  REMARKS =req.body.Remarks;
// let  NOC_forwarded_to=req.body.noc_forwarded_to;

// console.log(sbu_name);
// console.log(noc_requested_by);
//   try{

//   const resultset= await db.query("INSERT INTO nocdetails(SBU_NAME,NOC_Requested_By, employee_no,employee_name,reason,flexRadioDefault,entry,Remarks,noc_forwarded_to,documents) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
//   [sbu_name,noc_requested_by,Emp_no,Emp_name,select,radio,DATE,REMARKS,NOC_forwarded_to,Documents]);
//  console.log(resultset);
//   res.send("form submitted");
//   }
//   catch(err)
//   {
//     console.log(err);
//   }

// });

  // app.post("/Submit",upload.single("documents"),(req,res)=>{
  //   res.send("file uploaded and form submitted");
  // });


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
app.get("/", (req, res) => {
  res.render("home.ejs");
});
app.get("/Sap", (req, res) => {
  res.render("Sap.ejs");
});


app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});


app.post("/register", async (req, res) => {
  const email=req.body.username;
  const password=req.body.password;
  try{
    const checkResult=await db.query("SELECT * FROM users where email=$1",[email]);
    if(checkResult.rows.length >0)
    {
      res.send("Email already exist");
    }
    else{
   
  const result= await db.query("INSERT INTO users(email,password) values ($1,$2)",[email,password]);

console.log(result);
 res.render("secret.ejs");}
  }
  catch(err){
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email=req.body.username;
  const password=req.body.password;
console.log(email);
console.log(password);
res.render("cards.ejs");
});
app.get("/noc", (req, res) => {
  res.render("noc.ejs");
});
app.get("/Submit", (req, res) => {
  res.send("form submitted");
});
app.get("/Save", (req, res) => {
  res.send("form submitted");
});
app.post("/Save",async(req,res)=>
{
  let   SBU_name=req.body.SBU_NAME;
  let   Request_date=req.body.request_date;
  let    Request_raised_by = req.body.request_raised_by;
  let Approved_by=req.body.approved_by;
  let  Correspondance_date =req.body.correspondance_date;
  let  Action_taken =req.body.action_taken;
  let  Action_date =req.body.action_date;
  let  FlexRadioDefault =req.body.flexRadioDefault;
  //  let  Upload_file=req.body.upload_file;
      
    try 
    {
  
    const results= await db.query("INSERT INTO sapdetails(SBU_NAME,request_date,request_raised_by,approved_by,correspondance_date,action_taken,action_date,flexRadioDefault)values($1,$2,$3,$4,$5,$6,$7,$8)",
    [SBU_name,Request_date,Request_raised_by,Approved_by,Correspondance_date,Action_taken,Action_date,FlexRadioDefault]);
   console.log(results);
   res.send("form submitted");
    }
    catch(err)
    {
      console.log(err);
    }
});



app.post("/Viewfile",upload.single("documents"),async (req,res)=>{
  
  let sbu_name=req.body.SBU_NAME;
 let noc_requested_by=req.body.NOC_Requested_By;
let Emp_no = req.body.employee_no;
let Emp_name=req.body.employee_name;
let  select =req.body.reason;
let  radio  =req.body.flexRadioDefault;
let   DATE =req.body.entry;
let  REMARKS =req.body.Remarks;
let  NOC_forwarded_to=req.body.noc_forwarded_to;
// let documents=req.body.documents;
let  Documents= "/Tracking System/public/images/"+req.file.filename;

console.log(sbu_name);
console.log(noc_requested_by);
res.send ( req.file.Documents);

  try{

  const resultset= await db.query("INSERT INTO nocdetails(SBU_NAME,NOC_Requested_By, employee_no,employee_name,reason,flexRadioDefault,entry,Remarks,noc_forwarded_to,documents) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
  [sbu_name,noc_requested_by,Emp_no,Emp_name,select,radio,DATE,REMARKS,NOC_forwarded_to,Documents]);
 console.log(resultset);
 
 
 
 
 
  }
  catch(err)
  {
    console.log(err);
  }

});
// app.get("/Viewfile",(req,res)=>{
// res.send ("file uploaded");
// });
// app.post("/Viewfile",async(req,res)=>{
//   const filePath = req.body.file;

//   // Check if the file exists
//   if (fs.existsSync(filePath)) {
//       // Stream the file as the response
//       fs.createReadStream(filePath).pipe(res);
//   } else {
//       res.status(404).send("File not found");
//   }

//  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
