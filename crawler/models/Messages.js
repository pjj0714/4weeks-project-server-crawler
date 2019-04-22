'use strict';
module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    'Messages',
    {
      title: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
      direct_message: DataTypes.STRING,
      created_date: DataTypes.DATE
    },
    {
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    }
  );

  Messages.associate = function(models) {
    // associations can be defined here
  };
  return Messages;
};
