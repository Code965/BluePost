module.exports =  (sequelize, DataTypes)=>{

    const Commenti = sequelize.define("Commenti",{
        commentBody:{
            type: DataTypes.STRING,
            allowNull:false,   
        },
        postIdC:{
            type: DataTypes.INTEGER,
            allowNull:false,   
        },
        username:{
            type: DataTypes.STRING,
            allowNull:false,     
        },

    })


    return Commenti

} //ci consente di esportare ci sono due modi e questo e` uno dei due
    //questo modulo esporta 