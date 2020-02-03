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

// permet de recuperer toutes les factures 
router.get('/factures',(req,res) => {

  mysqlConnection.query('SELECT * FROM facture', function(err, rows, fields)
 { 
    if (!err){
        res.json(rows);
    }else{
        console.log(err)
    }

  });

});

// permet d'afficher une facture à partir de son id 
router.get('/factures/:id',(req,res) => {
    //const {id }= req.params;  // permet de récupérer l'id du param de l'url 
    mysqlConnection.query('SELECT * FROM facture WHERE idparking=?', [req.params.id], function(err, rows, fields) // le [req.params.id] permet de remplacer le ? 
    { 
        if (!err){
            res.json(rows[0]);
        }else{
            console.log(err)
        }
    });
    });


    // permet de créer une facture

    router.post('/factures/create', function(req, res){
        var params = req.body; 
        console.log(params);
        mysqlConnection.query('INSERT INTO facture SET ?', [params], function(err, rows, fiels)
        { 
            if (!err){
                res.json("la facture est create");
            }else{
                console.log(err)
            }   
    });
    
    });

    // permet de supprimer une facture 
    router.delete('/factures/delete/:id', function(req,res){

        mysqlConnection.query('DELETE FROM facture WHERE idfacture=?', [req.params.id], function(err,rows, fields)
        { 
            if (!err){
                res.json("la facture est delete");
            }else{
                console.log(err)
            }   
        
        });
        });

        // permet de modifier une facture en fonction de son id 
        router.put('/factures/:id', function(req,res){
            mysqlConnection.query('UPDATE facture SET ? where idfacture=?', [req.body, req.params.id], function(err, rows, fields)
                { 
                    if (!err){
                        res.json("la facture est modif");
                    }else{
                        console.log(err)
                    }   
            });
            
            });

// permet d'attribuer un client à une facture méthode 1 
router.put('/factureclient/:id', function (req, res) {
    mysqlConnection.query('UPDATE facture SET client=? where idfacture=?', [req.body.client, req.params.id], function (err, rows, fields) {
        if (!err) {
            res.json("On ajoute un client à la facture");
        } else {
            console.log(err)
        }
    });

});

// permet d'attribuer un client à une facture méthode 2
router.put('/factureclient2/:id/:client', function (req, res) {
    mysqlConnection.query('UPDATE facture SET client=?  where idfacture=?', [req.params.client, req.params.id], function (err, rows, fields) {
        if (!err) {
            res.json("On ajoute un client à la facture");
        } else {
            console.log(err)
        }
    });

});

// permet d'attribuer un parking à une facture méthode 1 
router.put('/factureparking/:id', function (req, res) {
    mysqlConnection.query('UPDATE facture SET parking=? where idfacture=?', [req.body.parking, req.params.id], function (err, rows, fields) {
        if (!err) {
            res.json("On ajoute un parking à la facture");
        } else {
            console.log(err)
        }
    });

});

// permet d'attribuer un parking à une facture méthode 2
router.put('/factureparking2/:id/:park', function (req, res) {
    mysqlConnection.query('UPDATE facture SET parking=?  where idfacture=?', [req.params.park, req.params.id], function (err, rows, fields) {
        if (!err) {
            res.json("On ajoute un parking à la facture");
        } else {
            console.log(err)
        }
    });

});



module.exports=router;


