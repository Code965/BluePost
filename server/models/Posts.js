module.exports =  (sequelize, DataTypes)=>{

    const Posts = sequelize.define("Posts",{
        title:{
            type: DataTypes.STRING,
            allowNull:false,   
        },

        postText:{
            type: DataTypes.STRING,
            allowNull:false,   
        },
        username:{
            type: DataTypes.STRING,
            allowNull:false,   
        },

    });    


    Posts.associate = (models) => {
        Posts.hasMany(models.Commenti, {
          onDelete: "cascade",
        });
    
        Posts.hasMany(models.Likes, {
          onDelete: "cascade",
        });
      };

    return Posts

} //ci consente di esportare ci sono due modi e questo e` uno dei due
    //questo modulo esporta 