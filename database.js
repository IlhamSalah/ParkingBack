const mysql =require('mysql');

const mysqlConnection = mysql.createConnection({

    host: 'localhost',
    user:'root',
    password:'root',
    database:'first_node'
});

mysqlConnection.connect(function(err){
if (err){
console.log(err);
return; 
}else{
    console.log('Connexion Réussie ! ')

}

});

module.exports = mysqlConnection; // on a déclarer un module tout seul afin de faire la connexion à la base
// pour pouvoir l'utiliser par un autre fichier on doit l'export 