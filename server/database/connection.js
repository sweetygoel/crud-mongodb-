const MongoClient=require('mongodb').MongoClient
const route=require('../routes/router')

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if (err) throw err
    console.log("Database connected..")
    const db=client.db('SampleDB')
    const allContact=db.collection('contacts')

    //add data
    // route.post('/addContact',(req,res)=>{
    //     if(!req.body){
    //         res.status(400).send({message:"Content can not be empty!"})
    //         return;
    //     }
    //     //const data={name:req.body.name,contact:req.body.contact,status:req.body.status}
    //     allContact.insertOne(req.body)
    //     .then(result =>{
    //         console.log(req.body)
    //         //res.send(req.body)
    //         res.redirect('/')
    //     })
    //     .catch(error  =>{
    //         console.log(error)
    //     })
    // })

    
    route.get('/',(req, res)=> {
        var mysort = {name: 1};
        allContact.find().sort(mysort).toArray((err,result)=>{
          if(err) throw err;
            res.render("index",{results:result})
        //res.json(result)
      });
      });

      //add data
    route.post('/addContact',(req, res)=>{
        let data = {name:req.body.name, contact:req.body.contact,status:req.body.status};
        allContact.insertOne(data,function(err,result){
            if(err) throw err;
            console.log(result)
            console.log("1 record inserted!");  
        });
        res.redirect("/") 
    });

    //to delete the contact

    route.get('/deleteContact/:name',(req, res)=>  {
        const name=req.params.name;
        console.log(name);
        var myquery = {name:name}
        allContact.deleteOne(myquery, function(err,result){
            if(err) throw err;
            console.log("1 document deleted");
               });
               res.redirect("/");
        });

        //edit contact

        route.get('/updateContact/:name',(req, res)=> {
            const name=req.params.name;
            console.log(name);
            var obj = {"name": name};
            allContact.findOne(obj,function(err,result){
              if(err) throw err;
              console.log(result.name);
              res.render('updateContact',{
              results: result
            });
            });
            });

            //update contact

            route.post('/updateContact', (req,res)=>{
                let data ={name:req.body.name, contact:req.body.contact,status:req.body.status};
                var myquery = {name: req.body.name};
                var newvalues = {$set: {name:req.body.name, contact:req.body.contact,status:req.body.status}};
                 allContact.updateOne(myquery, newvalues, function(err,res){
                     if(err) throw err;
                     console.log("1 document updated");
                 });
                 res.redirect("/");
          });
})

