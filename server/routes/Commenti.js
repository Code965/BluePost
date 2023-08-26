//faccio lo stesso procedimento pero` qui stavolta utilizzo router
const { Router } = require('express');
const express = require('express');
const router = express.Router(); //esporto lui
const { validateToken }= require('../Middleware/AuthMiddleware');

//cosi lo spacchetto
const {Commenti} = require('../models');

//API

router.get('/mostraCommenti/:CommentId', async (req,res)=>{
   
   const CommentId = req.params.CommentId;
   //Questo metodo e` molto meglio
   const commento = await Commenti.findAll({where:{ postIdC: CommentId}});
   res.json(commento);
});
     



router.post("/inserisciCommento", validateToken, async(req, res)=>{
    const commento = req.body;
    const username = req.user.username;

    commento.username = username;

    await Commenti.create(commento);
    if(commento){
        res.json(commento);
    }else{
        res.json("errore");
    }
})

router.delete('/eliminaCommenti/:CommentId',validateToken, async(req,res)=>{
    const CommentId = req.params.CommentId;

    const commento_eliminato = await Commenti.destroy({where:{id:CommentId}});

    res.json("eliminato");

})

//LO ESPORTO
module.exports = router