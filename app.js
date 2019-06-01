const routesController = require('./server/controllers/routesController');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({
    extended: false
}));

app.set('view engine', 'ejs');

app.get('/', routesController.goHome);
app.get('/results', routesController.getResults);
app.post('/results', routesController.addMessage);

app.listen(port, () => console.log(`Listening to port ${port}`));