const express=require('express')
const MongoClient=require('mongodb').MongoClient
const route=express.Router()
const connection=require('../database/connection')

//we use route in place of app

//first page
route.get('/',(req,res)=>{
    res.render('index')
});

//addcontact page render
route.get('/addContact',(req,res)=>{
    res.render('addContact')
})

//updatepage render
route.get('/updateContact',(req,res)=>{
    res.render('updateContact')
})


//export route so that we can use in server file
module.exports=route


// //first page
// app.get('/',(req,res)=>{
//     res.render('index')
// });

// //addcontact page render
// app.get('/addContact',(req,res)=>{
//     res.render('addContact')
// })

// //updatepage render
// app.get('/updateContact',(req,res)=>{
//     res.render('updateContact')
// })
