const vision = require('@google-cloud/vision');
require('dotenv').config();

module.exports = async img => {
  const client = new vision.ImageAnnotatorClient();
  const nailCheck = /Nail|Polish|Manicure/;
  const imgCheck = await client.labelDetection(img);
  const imageLabelAnnotations = imgCheck[0].labelAnnotations;

  let temp = '';
  imageLabelAnnotations.forEach(el => {
    if (el.score >= 0.8) {
      temp += el.description;
    }
  });
  if (nailCheck.test(temp)) {
    return imageLabelAnnotations;
  } else {
    return null;
  }
};
// gcvFilter(
//   'https://scontent-icn1-1.cdninstagram.com/vp/f5b5315d7d00d524e3c662e564940b64/5D150B63/t51.2885-15/e35/51854181_412273626248985_5382004849831779759_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com'
// );
