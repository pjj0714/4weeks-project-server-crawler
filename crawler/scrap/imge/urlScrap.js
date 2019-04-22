const imageScrap = require('./imageScrap');
let Instagram = require('../user/getUserInfoclass');
Instagram = new Instagram();
const logger = require('../../logger/logger');
const tagLog = logger('tag');
const errorLog = logger('error');

async function forLoop(tagArr) {
  console.log(
    'tagArr : ',
    tagArr.data.hashtag.edge_hashtag_to_media.edges.length
  );
  let arr = tagArr.data.hashtag.edge_hashtag_to_media.edges;
  for (let value of arr) {
    try {
      await imageScrap(
        `/p/${value.node.shortcode}`,
        value.node.id,
        value.node.thumbnail_resources[2].src
      );
    } catch (er) {
      console.log('forLoop Err : ', er.message);
      errorLog.error(er.message);
    }
  }
}

async function insta(tagName, after) {
  const tagData = after
    ? await Instagram.getTagMedia(tagName, 10, after)
    : await Instagram.getTagMedia(tagName, 10);
  try {
    tagLog.info(`${tagName}, ${Instagram.getTagNextPage(tagData)}`);
    await forLoop(tagData);
  } catch (err) {
    console.log('first : ', err.message);
    errorLog.error(`${tagName}, ${err.message}`);
  }

  async function rec(name, count, after) {
    let postData = await Instagram.getTagMedia(name, count, after);
    let temp;
    temp = postData.data.hashtag;

    try {
      tagLog.info(`${tagName}, ${Instagram.getTagNextPage(postData)}`);
      await forLoop(postData);
    } catch (err) {
      console.log('recErr : ', err.message);
      errorLog.error(`${tagName}, ${err.message}`);
    }
    if (temp.edge_hashtag_to_media.page_info.has_next_page) {
      rec(tagName, 10, Instagram.getTagNextPage(postData));
    } else {
      console.log('끝');
      return;
    }
  }
  await rec(tagName, 10, Instagram.getTagNextPage(tagData));
}

module.exports = insta;
