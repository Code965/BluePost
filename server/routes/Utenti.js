//faccio lo stesso procedimento pero` qui stavolta utilizzo router
const express = require('express');
const router = express.Router();

//cosi lo spacchetto
const {Utenti} = require('../models');
const bcrypt = require('bcrypt');

const {sign} = require('jsonwebtoken');
const { validateToken } = require('../Middleware/AuthMiddleware');

//API

router.get("/ottieniUtenti/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Utenti.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  if(!basicInfo){
    res.json("errore")
  }
  res.json(basicInfo);
});

router.post('/inserisciUtente', async(req,res)=>{

    const {username,password} = req.body; //scompatto tutto
    bcrypt.hash(password,10).then((hash)=>{
        Utenti.create({
            username:username,
            password:hash,
        })
        
        res.json("registrato")
    });

})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    const user = await Utenti.findOne({ where: { username: username } });
  
    if (!user) res.json({ error: "User Doesn't Exist" });
  
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) res.json({ error: "Wrong Username And Password Combination" });
  
      const accessToken = sign(
        { username: user.username, id: user.id },
        "secret"
      );      

      res.json({token:accessToken,username: username,id:user.id});
    });
  });


  router.get('/auth', validateToken, (req,res)=>{
    res.json(req.user);

  })

//LO ESPORTO
module.exports = router