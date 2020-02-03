const express = require('express');
const app= express(); // app sera l'éxecutable principal de notre application 

var bodyParser= require('body-parser');
// Configuration du port 
app.set('port', 3000);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));
  
// Routes 
app.use(require('./routes/voitures'));
app.use(require('./routes/personnes'));
app.use(require('./routes/parking'));
app.use(require('./routes/facture'));



app.listen(app.get('port'), () =>{
    console.log('Serveur démarré sur le port 300')
});