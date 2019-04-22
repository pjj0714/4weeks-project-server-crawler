const User = require('../../models/index').Users;
let Instagram = require('./getUserInfoclass');
let Oauth = require('./authCheck');
Instagram = new Instagram();
Oauth = new Oauth();
let count = Date.now() + 43000000;
let login;
let f = true;

module.exports = async function users(name) {
  const userInfo = await Instagram.getUserInfo(name);
  if (userInfo !== '중복') {
    await userTable(userInfo);
  }
  return;
};

async function userTable(data) {
  const {
    full_name,
    id,
    username,
    profile_pic_url_hd,
    is_business_account,
    biography,
    edge_followed_by,
    edge_follow,
    edge_owner_to_timeline_media,
    business_category_name
  } = data.graphql.user;
  const userCheck = await User.findOne({
    where: {
      account_id: id
    }
  });
  if (userCheck !== null) {
    console.log('user 중복');
    return '중복';
  }
  let flag = true;
  let time = Date.now();
  if (count < time) {
    count = time + 43000000;
    login = await Oauth.login('id', 'password');
  }
  if (f) {
    login = await Oauth.login('id', 'password');
    f = false;
  }
  let { access_token, expires_in, token_type } = login;
  count = expires_in;
  let check = await Oauth.getCheck(access_token, token_type, id);
  check = check.totalCount;
  if (!check) {
    flag = false;
  }
  const obj = {
    account_full_name: full_name,
    account_id: id,
    account_name: username,
    account_profile_img_url: profile_pic_url_hd,
    channel_type: is_business_account,
    account_tag: biography,
    is_shop: filter(biography),
    double_check_it: flag,
    followed_by_count: edge_followed_by.count,
    follows_count: edge_follow.count,
    media_count: edge_owner_to_timeline_media.count,
    category: business_category_name,
    last_imported_date: Date.now(),
    created_by: '',
    created_date_timestamp: '',
    last_modified_by: '',
    last_modified_date_timestamp: '',
    expired_date: '',
    is_expired: '',
    account_import_status: '',
    account_imported_max_media_id: '',
    account_imported_min_media_id: '',
    account_profile_image_json: '{}',
    target_design_source_channel_account_ids: '',
    will_merge_on_sourced: '',
    is_active: '',
    send_date: '',
    send_message: '',
    status: '미확인'
  };
  await User.create(obj);
  return;
}

function filter(comment) {
  const check = /카카오|kakao|DM|문의|주소|address|전화|예약|010|open|채팅|시술|링크|link|카톡|네일샵|네일샾|휴무/i;

  return check.test(comment);
}
