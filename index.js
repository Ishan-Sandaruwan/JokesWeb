import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3030;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/",(req,res)=>{
    var endpoint = "https://v2.jokeapi.dev/joke/Any?type=twopart";
    getJoke(endpoint,res);
});

app.get("/getJoke",async (req,res)=>{
    let blacklistFlags = req.query["blacklistFlags"];
    let contains = req.query.contains;
    var endpoint = "https://v2.jokeapi.dev/joke/Any?type=twopart";
    if (blacklistFlags && contains ) {
        endpoint = `https://v2.jokeapi.dev/joke/Any?type=twopart&blacklistFlags=${blacklistFlags}&contains=${contains}`;
    } else if (blacklistFlags) {
        endpoint = `https://v2.jokeapi.dev/joke/Any?type=twopart&blacklistFlags=${blacklistFlags}`;
    } else if (contains) {
        endpoint = `https://v2.jokeapi.dev/joke/Any?type=twopart&contains=${contains}`;
    }
    console.log(endpoint);
    getJoke(endpoint,res);
});

async function getJoke(endpoint,res) { 
    let imgNo = Math.floor((Math.random()*7)+1);
    try{
        const response = await axios.get(endpoint);
        res.render("./index.ejs",{
            joke : response.data ,
            img : imgNo ,
        });
    }catch (error) {
        console.error("Error:", error.message);
        res.render("./index.ejs", {
            error: "An error occurred while fetching the data.",
        });
    }
}

app.listen(port,()=>{
    console.log("server is running on port "+port);
})