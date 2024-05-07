const express = require('express');
const path = require('path');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ContactDance');

const port = 8000;

const bodyparser = require("body-parser");


//Define the mongoose Schema 
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
const contact = mongoose.model('Contact', contactSchema);


// EXPRESS RELATED STUFF
app.use('/static' , express.static('static'));    // for serving static files 
app.use(express.urlencoded());


// PUG SPECIFIC STUFF 
app.set('view engine', 'pug')                  // set the template engine as pug 
app.set('views' , path.join(__dirname, 'views'));     // set the views directory 


// END POINT 
app.get('/' , (req,res)=>{
    const fuck =   { };
     res.status(200).render('home.pug' , fuck)
})

// END POINT for serving CONTACT
app.get('/contact' , (req,res)=>{
    const fuck =   { };
     res.status(200).render('contact.pug' , fuck)
})

app.post('/contact' , (req,res)=>{
   var myData = new contact(req.body);

   myData.save().then(()=>{
     res.send("This item is saved successfully")
   }).catch(()=>{
    res.status(400).send("Item was not saved to the database =")
   })

    //  res.status(200).render('contact.pug' , fuck)
})



// START THE SERVER 
app.listen(port, ()=>{
    console.log(`The application has started successfully at port ${port}`)
});
