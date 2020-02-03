const express =require('express');
const router = express.Router(); // on utiliser les router d'express 

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

// permet de recuperer tous les parkings 
router.get('/parkings',(req,res) => {

  mysqlConnection.query('SELECT * FROM parking', function(err, rows, fields)
 { 
    if (!err){
        res.json(rows);
    }else{
        console.log(err)
    }

  });

});

// permet un parking à partir de son id 
router.get('/parkings/:id',(req,res) => {
    //const {id }= req.params;  // permet de récupérer l'id du param de l'url 
    mysqlConnection.query('SELECT * FROM parking WHERE idparking=?', [req.params.id], function(err, rows, fields) // le [req.params.id] permet de remplacer le ? 
    { 
        if (!err){
            res.json(rows[0]);
        }else{
            console.log(err)
        }
    });
    });


    // permet de créer un parking

    router.post('/parkings', function(req, res){
        var params = req.body; 
        console.log(params);
        mysqlConnection.query('INSERT INTO parking SET ?', [params], function(err, rows, fiels)
        { 
            if (!err){
                res.json(rows);
            }else{
                console.log(err)
            }   
    });
    
    });

    // permet de supprimer un parking 
    router.delete('/parkings/:id', function(req,res){

        mysqlConnection.query('DELETE FROM parking WHERE idparking=?', [req.params.id], function(err,rows, fields)
        { 
            if (!err){
                res.json("le parking est delete");
            }else{
                console.log(err)
            }   
        
        });
        });

        // permet de modifier un parking en fonction de son id 
        router.put('/parkings/:id', function(req,res){
            mysqlConnection.query('UPDATE parking SET ? where idparking=?', [req.body, req.params.id], function(err, rows, fields)
                { 
                    if (!err){
                        res.json("le parking est modif");
                    }else{
                        console.log(err)
                    }   
            });
            
            });
module.exports=router;