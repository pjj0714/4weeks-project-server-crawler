const fetch = require('node-fetch');
const gcvFilter = require('../../googleCloudVision/index');
// 이미지 업로드 로직
// const ficture = require('../../imageUpload/screenshot');
// const upload = require('../../imageUpload/s3Upload');
const userInfo = require('../user/getUserInfo');
const Images = require('../../models/index').Images;
async function imageScrap(imageUrl, id, thumb_src) {
  let image = await Images.findOne({
    where: { source_content_id: id }
  });

  if (image !== null) {
    console.log('image 중복!!');
    return;
  } else {
    let datas = await fetch(`https://www.instagram.com/${imageUrl}/?__a=1`);
    datas = await datas.json();
    const tagImage = await tagDesign(
      datas.graphql.shortcode_media,
      id,
      thumb_src
    ); // Image Table 생성
    if (tagImage !== null) {
      await userInfo(datas.graphql.shortcode_media.owner.username); // User Table 생성
    }
    return;
  }
}

async function tagDesign(data, id, thumb_src) {
  const gcv = await gcvFilter(data.display_url);
  if (gcv === null) {
    console.log('네일사진아님');
    return null;
  }

  let mediaType = 'image';
  if (data.is_video) {
    mediaType = 'video';
  }

  //tags
  let tags = [];
  let commentList = data.edge_media_to_comment.edges.map(el => el.node.text);
  let caption = data.edge_media_to_caption.edges[0].node.text;

  tagFilter(caption, tags);
  commentList.map(el => tagFilter(el, tags));

  // //

  let obj = {
    created_by: '',
    created_date: '',
    last_modified_by: '',
    last_modified_date: '',
    like_count: 0,
    media_type: mediaType,
    scrap_count: 0,
    view_count: 0,
    source_channel_type: 'INSTA',
    source_content_id: id,
    source_content_text: data.edge_media_to_caption.edges[0].node.text,
    source_channel_account_id: data.owner.id,
    source_channel_account_name: data.owner.username,
    status: '',
    source_created_date: new Date(data.taken_at_timestamp * 1000),
    url_l: data.display_resources[2].src,
    url_m: data.display_resources[1].src,
    url_s: data.display_resources[0].src,
    url_thumb: thumb_src,
    keywords: JSON.stringify(tags),
    instagramUrl: `https://www.instagram.com/p/${data.shortcode}`,
    url_l_height: data.display_resources[2].config_height,
    url_l_width: data.display_resources[2].config_width,
    url_m_height: data.display_resources[1].config_height,
    url_m_width: data.display_resources[1].config_width,
    url_s_height: data.display_resources[0].config_height,
    url_s_width: data.display_resources[0].config_width,
    url_thumb_height: '',
    url_thumb_width: '',
    label_text: JSON.stringify(gcv),
    image_json: '',
    imported_date: Date.now()
  };

  // await ficture(data.display_resources[1].src);
  // await upload(id);
  await Images.create(obj);
  return obj;
}

function tagFilter(value, array) {
  const tagTest = value => {
    return /#[^#\s,;]+/gm.test(value);
  };

  const tagfil = value => {
    value.replace(/#[^#\s,;]+/gm, function(tag) {
      array.push(tag);
    });
  };

  if (tagTest(value)) {
    return tagfil(value);
  }
}
module.exports = imageScrap;
