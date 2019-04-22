const superagent = require('superagent');
const crypto = require('crypto');

module.exports = class Instagram {
  async getUserInfo(name) {
    const url = `https://www.instagram.com/${name}`;
    const sharedData = await superagent.get(url);
    const sharedDataText = sharedData.text;

    const userDataText = sharedDataText
      .match(
        /<script type="text\/javascript">window\._sharedData = (.*)<\/script>/
      )[1]
      .slice(0, -1);
    const userData = JSON.parse(userDataText).entry_data.ProfilePage[0];

    return userData;
  }

  async getUserMedia(name, id, count, after) {
    const generateRequestSignature = function(rhxGis, queryVariables) {
      return crypto
        .createHash('md5')
        .update(`${rhxGis}:${queryVariables}`, 'utf8')
        .digest('hex');
    };

    const initResponse = await superagent.get(
      `https://www.instagram.com/${name}`
    );
    const rhxGis = RegExp('"rhx_gis":"([a-f0-9]{32})"', 'g').exec(
      initResponse.text
    )[1];

    count = count || 20;

    let queryVariables = {
      id,
      first: count
    };

    if (after) {
      queryVariables.after = after;
    }

    queryVariables = JSON.stringify(queryVariables);

    const signature = generateRequestSignature(rhxGis, queryVariables);

    const res = await superagent
      .get('https://www.instagram.com/graphql/query/')
      .query({
        query_hash: '42323d64886122307be10013ad2dcc44',
        variables: queryVariables
      })
      .set({
        'X-Instagram-GIS': signature,
        accept: '*/*'
        // 'x-requested-with': 'XMLHttpRequest'
      });

    return res.body.data.user.edge_owner_to_timeline_media;
  }

  async getTagMedia(name, count, after) {
    const generateRequestSignature = function(rhxGis, queryVariables) {
      return crypto
        .createHash('md5')
        .update(`${rhxGis}:${queryVariables}`, 'utf8')
        .digest('hex');
    };
    let encodeName = encodeURI(name);
    const initResponse = await superagent.get(
      `https://www.instagram.com/explore/tags/${encodeName}`
    );
    // console.log(initResponse);

    const rhxGis = RegExp('"rhx_gis":"([a-f0-9]{32})"', 'g').exec(
      initResponse.text
    )[1];

    count = count || 20;

    let queryVariables = {
      tag_name: name,
      first: count
    };

    if (after) {
      queryVariables.after = after;
    }

    queryVariables = JSON.stringify(queryVariables);

    const signature = generateRequestSignature(rhxGis, queryVariables);

    const res = await superagent
      .get('https://www.instagram.com/graphql/query/')
      .query({
        query_hash: '298b92c8d7cad703f7565aa892ede943',
        variables: queryVariables
      })
      .set({
        'X-Instagram-GIS': signature,
        accept: '*/*'
        // 'x-requested-with': 'XMLHttpRequest'
      });
    return res.body;
  }

  getTagNextPage(json) {
    let page = json.data.hashtag.edge_hashtag_to_media.page_info;

    return page.has_next_page ? page.end_cursor : false;
  }
};
