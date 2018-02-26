module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define("Company", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Company.associate = function(models) {
    // We're saying that a Company should belong to a User
    // A Company can't be created without a User due to the foreign key constraint
    Company.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });

    // Associating Clients with Companies
    Company.hasMany(models.Client);
  };

  return Company;
};
