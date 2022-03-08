const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


const accountsRoute = require('./controllers/accounts');

app.use('/api/accounts', accountsRoute);

const port = 5090;
app.listen(port, function(){
    console.log(`Server is running via port ${port}`);
});

