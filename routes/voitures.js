const express = require('express');
const router = express.Router(); // on utiliser les touter d'express 

// on utilise le fihcier de configuration database.js
const mysqlConnection = require('../database.js');

// Webservice get : chercher toutes les voitures 

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
   

});

// les routes st caractérisé par un chemin ici /voitures et qui marche avec un get 

router.get('/voitures', (req, res) => {

    mysqlConnection.query('SELECT * FROM voiture', function (err, rows, fields) {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err)
        }

    });

});
// Configuration de cross origin 


// Webservice get: chercher une voiture par son matricule 

router.get('/voitures/:id', (req, res) => {
    //const {id }= req.params;  // permet de récupérer l'id du param de l'url 
    mysqlConnection.query('SELECT * FROM voiture WHERE idvoiture=?', [req.params.id], function (err, rows, fields) // le [req.params.id] permet de remplacer le ? 
    {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err)
        }
    });
});

router.post('/voitures', function (req, res) {
    var params = req.body;
    console.log(params);
    mysqlConnection.query('INSERT INTO voiture SET ?', [params], function (err, rows, fiels) {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err)
        }
    });

});

router.delete('/voitures/:id', function (req, res) {

    mysqlConnection.query('DELETE FROM voiture WHERE idvoiture=?', [req.params.id], function (err, rows, fields) {
        if (!err) {
            res.json("la voiture est delete");
        } else {
            console.log(err)
        }

    });
});

router.put('/voitures/:id', function (req, res) {
    mysqlConnection.query('UPDATE voiture SET ? where idvoiture=?', [req.body,req.params.id], function (err, rows, fields) {
        if (!err) {
            res.json("la voiture est modif");
        } else {
            console.log(err)
        }
    });

});


router.get('/voiturestest/:proprietaire', function (req, res) {
    mysqlConnection.query('SELECT * FROM voiture WHERE proprietaire=?', [req.params.proprietaire], function (err, rows, fields) // le [req.params.id] permet de remplacer le ? 
    {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err)
        }
    });
});

//permet d'affilier une voiture à une personne en fonction de l'id de la voiture qui est indiquer ds url et de l'id du proprietaire qui est indiqué ds le body 
router.put('/voiturestest/:id', function (req, res) {
    mysqlConnection.query('UPDATE voiture SET proprietaire=? where idvoiture=?', [req.body.proprietaire, req.params.id], function (err, rows, fields) {
        if (!err) {
            res.json("la voiture est modif");
        } else {
            console.log(err)
        }
    });

});

// autre façon de faire permettant d'affilier une voiture à une personne directement ds l'url 
router.put('/voiturestest2/:id/:prop', function (req, res) {
    mysqlConnection.query('UPDATE voiture SET proprietaire=?  where idvoiture=?', [req.params.prop, req.params.id], function (err, rows, fields) {
        if (!err) {
            res.json("la voiture est modif");
        } else {
            console.log(err)
        }
    });

});

// permet d'attribuer une place de parking à une voiture ds l'url et ds le body 
router.put('/voitureparking1/:id', function (req, res) {
    mysqlConnection.query('UPDATE voiture SET stationnement=? where idvoiture=?', [req.body.stationnement, req.params.id], function (err, rows, fields) {
        if (!err) {
            res.json("On ajoute une place de parking pour la voiture");
        } else {
            console.log(err)
        }
    });

});

// autre méthode qui permet d'attribuer une place de parking à une voiture que ds l'url 
router.put('/voitureparking2/:id/:stat', function (req, res) {
    mysqlConnection.query('UPDATE voiture SET stationnement=?  where idvoiture=?', [req.params.stat, req.params.id], function (err, rows, fields) {
        if (!err) {
            res.json("On ajoute une place de parking pour la voiture");
        } else {
            console.log(err)
        }
    });

});

router.get('/countVoitureClientParking/:id/:idpersonne', function(req,res){
    mysqlConnection.query('SELECT count(idvoiture) as nb_personne_parking_voiture,proprietaire,  nom, prenom, tarif  from voiture inner join personne on (voiture.proprietaire=personne.idpersonne) inner join parking on (voiture.stationnement=parking.idparking) where stationnement=? and idpersonne = ?  ', [req.params.id,req.params.idpersonne], function(err,rows,fields){
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err)
        }
    });

});



module.exports = router;