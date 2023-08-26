const express = require('express');
const app = express(); //questa sara` la nostra applicazione, e` un instanza del framework
const cors = require('cors');

const db = require('./models'); //posso importare moduli non built in in questo caso models
app.use(express.json());
app.use(cors()); //questo middleware ci consente di collegare il front end di react con nodejs

//ROUTERS

//POST
const postRouter = require('./routes/Posts');
app.use("/posts",postRouter);  //postRouter lo uso per le url posts

//COMMENTI
const commentiRouter = require('./routes/Commenti')
app.use('/commenti', commentiRouter);
//UTENTI
const utentiRouter = require('./routes/Utenti')
app.use('/auth',utentiRouter);     
//LIKES
const likesRouter = require('./routes/Likes')
app.use('/likes',likesRouter);


//SINCRONIZZA IL SERVER CON IL DB
db.sequelize.sync().then(()=>{

    app.listen(3002,()=>{
        console.log("Server running on port 3002")
    });

})
