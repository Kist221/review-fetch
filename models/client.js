module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define("Client", {
    // Giving the Client model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // Giving the Client model a name of type BOOLEAN
    gender: {
      type: DataTypes.BOOLEAN
    },
    // Giving the Client model an email of type STRING
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    // Giving the Client model a phone of type STRING
    phone: {
      type: DataTypes.STRING,
      validate: {
        len:[10,20]
      }
    }
  });

  Client.associate = function(models) {
    // We're saying that a Client should belong to a Company
    // A Client can't be created without a Company due to the foreign key constraint
    Client.belongsTo(models.Company, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Client;
};
