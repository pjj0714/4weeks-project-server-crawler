'use strict';
module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define(
    'Images',
    {
      created_by: DataTypes.STRING(50),
      created_date: DataTypes.DATE,
      last_modified_by: DataTypes.STRING(50),
      last_modified_date: DataTypes.DATE,
      like_count: DataTypes.INTEGER(10),
      media_type: DataTypes.STRING(50),
      scrap_count: DataTypes.INTEGER(10),
      view_count: DataTypes.INTEGER(10),
      source_channel_type: DataTypes.STRING(50),
      source_content_id: DataTypes.STRING(50),
      source_content_text: DataTypes.STRING(50),
      source_channel_account_id: DataTypes.STRING(20),
      source_channel_account_name: DataTypes.STRING(20),
      status: DataTypes.STRING(10),
      source_created_date: DataTypes.DATE,
      url_l: DataTypes.STRING,
      url_m: DataTypes.STRING,
      url_s: DataTypes.STRING,
      url_thumb: DataTypes.STRING,
      keywords: DataTypes.STRING,
      instagramUrl: DataTypes.STRING,
      url_l_height: DataTypes.STRING,
      url_l_width: DataTypes.STRING,
      url_m_height: DataTypes.STRING,
      url_m_width: DataTypes.STRING,
      url_s_height: DataTypes.STRING,
      url_s_width: DataTypes.STRING,
      url_thumb_height: DataTypes.STRING,
      url_thumb_width: DataTypes.STRING,
      label_text: DataTypes.STRING,
      image_json: DataTypes.STRING,
      imported_date: DataTypes.DATE
    },
    {
      timestamps: false,
      charset: 'utf8mb4'
    }
  );

  Images.associate = function(models) {
    // associations can be defined here
  };
  return Images;
};
