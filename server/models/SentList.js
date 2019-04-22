'use strict';
module.exports = (sequelize, DataTypes) => {
  const SentList = sequelize.define(
    'SentList',
    {
      account_id: DataTypes.STRING,
      direct_message: DataTypes.STRING,
      created_date: DataTypes.DATE
    },
    {
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    }
  );

  SentList.associate = function(models) {
    // associations can be defined here
  };
  return SentList;
};
