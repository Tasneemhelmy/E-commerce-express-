import express from 'express'
import bootstrap from'./src/bootstrap.js'
const port=3000
const app=express();
bootstrap(app,express)

app.listen(port,(error)=>{
    if(error) console.log(error)
        else console.log("server running");
    });