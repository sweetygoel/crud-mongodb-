const express=require('express');
const path=require('path')
const bodyParser=require('body-parser')
const connectDB=require('./server/database/connection');

const app=express();

const port=1000;


//parse request to body parser
app.use(bodyParser.urlencoded({extended:true}))

//set view engine
app.set('view engine','hbs')

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/images',express.static(path.resolve(__dirname,"assets/images")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/',require('./server/routes/router'))


app.listen(port,()=>{
    console.log(`server is listen to port ${port}`)
})