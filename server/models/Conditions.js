'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conditions = sequelize.define(
    'Conditions',
    {
      condition: DataTypes.STRING,
      title: DataTypes.STRING,
      last_modify_date: DataTypes.DATE
    },
    {
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    }
  );

  Conditions.associate = function(models) {
    Conditions.belongsTo(models.Messages, {
      foreignKey: 'title'
    });
  };
  return Conditions;
};
