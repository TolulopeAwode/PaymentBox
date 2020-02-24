'use strict';

const express = require('express');
const port = process.env.PORT || 8085;
const bankRoute = require('./routes/bankroute');
const payCategoryRoute = require('./routes/paymentcategoryroute');
const schoolAccountRoute = require('./routes/schoolaccountroute');
const channelRoute = require('./routes/channelroute');
const periodRoute = require('./routes/periodroute');
const payerRoute = require('./routes/payerroute');
const configRoute = require('./routes/configurationroute');
const transactionRoute = require('./routes/transactionroute');

// const programmeLevelRoute = require('./routes/programmelevelroute');
// const facultyRoute = require('./routes/facultyroute');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (req, res) => {
      // allowed XHR methods  
      res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.send();
  });
});

app.get("/testing",(req,res)=>{
   
  res.status(200).send('We are fine');
});
app.use(express.json());
app.use('/banks', bankRoute);
app.use('/paymentcategory', payCategoryRoute);
app.use('/schoolaccount', schoolAccountRoute);
app.use('/channels', channelRoute);
app.use('/periods', periodRoute);
app.use('/person', payerRoute);
app.use('/paymentconfig', configRoute);
app.use('/transactions', transactionRoute);

require('./startup/prod')(app);
// app.use('/awardlev', awardLevelRoute);
// app.use('/programmelev', programmeLevelRoute);

var models= require("./models");
models.sequelize.sync().then(c=>{
  console.log('Database connection looks good');
}).catch(err=>{console.log(err);})
app.listen(port, () => console.log(`Listening on port ${port}...`));
module.exports=app;