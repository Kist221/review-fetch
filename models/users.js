module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    // Giving the Users model a username of type STRING
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // Giving the Users model a password of type STRING
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Users.associate = function(models) {
    // Associating Users with Companies
    // When a Users is deleted, also delete any associated Companies
    Users.hasMany(models.Company, {
      onDelete: "cascade"
    });
  };

  return Users;
};
