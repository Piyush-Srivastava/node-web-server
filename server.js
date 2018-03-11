const express = require('express');
const hbs = require('hbs');//handle bar
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');//to set the view engine to hbs

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});

app.use((req,res,next) => {//middleware
    next();
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log+'\n',(err) => {
        if(err){
        console.log('Unable to append to server.log');
        }
    });
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs',{
//         pageTitle: 'Servers under Maintenance'
//     })
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) => {
   res.render('home.hbs',{
       pageTitle: 'Home Page',
       welcomeText: 'Welcome to the home page',
       currentYear: new Date().getFullYear()

   });
});

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
})

app.listen(3000,() => {//to listen the requests on port 3000
    console.log('Server is up on port 3000');
});