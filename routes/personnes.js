const express =require('express');
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

router.get('/personnes',(req,res) => {

  mysqlConnection.query('SELECT * FROM personne', function(err, rows, fields)
 { 
    if (!err){
        res.json(rows);
    }else{
        console.log(err)
    }

  });

});

router.get('/personnes/:id',(req,res) => {
    //const {id }= req.params;  // permet de récupérer l'id du param de l'url 
    mysqlConnection.query('SELECT * FROM personne WHERE idpersonne=?', [req.params.id], function(err, rows, fields) // le [req.params.id] permet de remplacer le ? 
    { 
        if (!err){
            res.json(rows[0]);
        }else{
            console.log(err)
        }
    });
    });
 
    router.get('/personnesParking/:id',(req,res) => {
        //const {id }= req.params;  // permet de récupérer l'id du param de l'url 
        mysqlConnection.query('SELECT idpersonne, nom, prenom FROM personne inner join voiture on ( personne.idpersonne= voiture.proprietaire) WHERE voiture.stationnement=? Group by personne.nom', [req.params.id], function(err, rows, fields) // le [req.params.id] permet de remplacer le ? 
        { 
            if (!err){
                res.json(rows);
            }else{
                console.log(err)
            }
        });
        });


    router.post('/personnes', function(req, res){
        var params = req.body; 
        console.log(params);
        mysqlConnection.query('INSERT INTO personne SET ?', [params], function(err, rows, fiels)
        { 
            if (!err){
                res.json(rows);
            }else{
                console.log(err)
            }   
    });
    
    });

    router.delete('/personnes/:id', function(req,res){

        mysqlConnection.query('DELETE FROM personne WHERE idpersonne=?', [req.params.id], function(err,rows, fields)
        { 
            if (!err){
                res.json("la personne est delete");
            }else{
                console.log(err)
            }   
        
        });
        });

        router.put('/personnes/:id', function(req,res){
            mysqlConnection.query('UPDATE personne SET ? where idpersonne=?', [req.body, req.params.id], function(err, rows, fields)
                { 
                    if (!err){
                        res.json("la personne est modif");
                    }else{
                        console.log(err)
                    }   
            });
            
            });
module.exports=router;