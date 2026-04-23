const express=require("express");
const mysql= require("mysql2");
const cors= require("cors");
const session = require("express-session");

const app= express();

app.use(cors({
    origin:"http://127.0.0.1:5500",
    credentials:true
}));
app.use(express.json());

app.use(session({
    secret:"my_secret_key",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxage:1000*60*60
    }

}))

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"Saas"
});

db.connect((err)=>{
    if(err){
        console.log("Database connection failed:", err);
    }else{
        console.log("Connected to MySQL");
    }
});

app.post("/register", (req, res)=>{
    const{UserID,Email,Password}=req.body;

    const sql="INSERT INTO user(UserID,Email,Password) VALUES (?,?,?)";
    db.query(sql,[UserID,Email,Password],(err,result)=>{
        if (err){
            console.log(err);
            res.status(500).send("error saving data");
        }else{
            res.send("User registered successfully");
        }
    });
});
app.post("/Login",(req,res)=>{
    const{UserID,Password}=req.body;

    const sql="SELECT*FROM user WHERE user.UserID=? AND user.Password=?";
    db.query(sql,[UserID,Password],(err,result)=>{
        if (err){
            console.log(err);
            res.status(500).send("Can't login");
        }else{
            res.send("Login successful");;
        }
    });   
 });
app.listen(3000,()=>{
    console.log("server running on http://localhost:3000");
});
