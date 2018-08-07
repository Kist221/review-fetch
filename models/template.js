module.exports = function(sequelize, DataTypes) {
  const Template = sequelize.define('Template', {
    // Giving the Template model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    // Giving the Template model a subject of type STRING
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    // Giving the Template model a message of type STRING
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  });

  Template.associate = function(models) {
    // We're saying that a Template should belong to a Company
    // A Template can't be created without a Company due to the foreign key constraint
    Template.belongsTo(models.Company, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Template;
};
