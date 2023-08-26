module.exports =  (sequelize, DataTypes)=>{

    const Utenti = sequelize.define("Utenti",{

        username:{
            type: DataTypes.STRING,
            allowNull:false,   
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,   
        },
      
    });

    Utenti.associate = (models) => {

        Utenti.hasMany(models.Likes, {
          onDelete: "cascade",
        });

        Utenti.hasMany(models.Posts, {
            onDelete: "cascade",
          });
      };
    return Utenti

} //ci consente di esportare ci sono due modi e questo e` uno dei due
    //questo modulo esporta 