'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      created_by: DataTypes.STRING,
      created_date_timestamp: DataTypes.DATE,
      last_modified_by: DataTypes.STRING,
      last_modified_date_timestamp: DataTypes.DATE,
      account_full_name: DataTypes.STRING,
      account_id: DataTypes.STRING,
      account_name: DataTypes.STRING,
      account_profile_img_url: DataTypes.STRING,
      channel_type: DataTypes.STRING,
      account_tag: DataTypes.STRING,
      is_shop: DataTypes.BOOLEAN,
      expired_date: DataTypes.DATE,
      double_check_it: DataTypes.BOOLEAN,
      is_expired: DataTypes.STRING,
      account_profile_image_json: DataTypes.STRING,
      followed_by_count: DataTypes.STRING,
      follows_count: DataTypes.STRING,
      media_count: DataTypes.STRING,
      category: DataTypes.STRING,
      account_import_status: DataTypes.STRING,
      account_imported_max_media_id: DataTypes.STRING,
      account_imported_min_media_id: DataTypes.STRING,
      last_imported_date: DataTypes.STRING,
      target_design_source_channel_account_ids: DataTypes.STRING,
      will_merge_on_sourced: DataTypes.STRING,
      is_active: DataTypes.STRING,
      send_date: DataTypes.DATE,
      send_message: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {
      timestamps: false,
      charset: 'utf8mb4'
    }
  );

  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};
