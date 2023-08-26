//faccio lo stesso procedimento pero` qui stavolta utilizzo router
const { Router } = require('express');
const express = require('express');
const router = express.Router(); //esporto lui
const { validateToken }= require('../Middleware/AuthMiddleware');

//cosi lo spacchetto
const {Likes} = require('../models');


router.post("/inserisciLike", validateToken, async (req, res) => {
    const { PostId } = req.body;
    const UtentiId = req.user.id;
    console.log()
    
    //trovo il valore
    const found = await Likes.findOne({
        where: { PostId: PostId, UtentiId: UtentiId },
      });
     
    //faccio un controllo
    if(!found){
        //SE Non trova un like lo crea
        await Likes.create({ PostId: PostId, UtentiId: UtentiId });
        res.json({liked: true })

    }else{
        //Altrimenti cancella la rows
        await Likes.destroy({
            where:{
                PostId:PostId,
                UtentiId:UtentiId
            },
        }); 
        res.json({liked: false })

        //facendomi tornare questi valori possono andare ad incrementare o decrementare

    }
   
  });

//API



//LO ESPORTO
module.exports = router