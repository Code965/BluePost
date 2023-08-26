//faccio lo stesso procedimento pero` qui stavolta utilizzo router
const express = require('express');
const { validateToken } = require('../Middleware/AuthMiddleware');
const router = express.Router();

//cosi lo spacchetto
const {Posts, Likes} = require('../models');

//API

router.get('/mostraPost',validateToken, async (req,res)=>{

   const listaPost = await Posts.findAll({include: [Likes]});


   const likedPosts = await Likes.findAll({//trovo tutti i mi piace che ha messo l'utente

        where:{UtentiId: req.user.id,}
   })


   //RITORNO UN OGGETTO con il numero dei post che ci sono e il numero dei like che ci sono
   res.json({listaPost: listaPost, likedPosts: likedPosts}); 

});


 router.get('/mostraPost/:PostId', async(req,res)=>{

     const PostId = req.params.PostId;
     const onePost = await Posts.findByPk(PostId);
     res.json(onePost);
 
  });


  router.get("/byuserId/:id", async (req, res) => {
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({
      where: { UtentiId: id },
      include: [Likes],
    });
    res.json(listOfPosts);
  });       
  
router.post('/aggiungiPost',validateToken, async(req, res)=>{

    const post = req.body; //cosi ho tutti i valori del post nel db sotto forma di json 
    const username = req.user.username;
    post.username = username;
    post.UtentiId = req.user.id
    await Posts.create(post); // await aspetta in  questo caso gli passiamo direttamente post che e` un oggetto json
    res.json(post);
    /*attua quello che ho definito nel concetto modello I/0 non blocc*/ 
});


router.delete("/eliminaPost/:postId",validateToken, async(req,res)=>{

    const postId = req.params.postId;

    const commento_eliminato = await Posts.destroy({where:{id:postId}});

    if(!commento_eliminato){
        
        res.json("errore");
    }else{
        res.json("eliminato");
    }

})



//LO ESPORTO
module.exports = router