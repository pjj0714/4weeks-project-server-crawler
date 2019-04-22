const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.loadFromPath(__dirname + '/../config/awsConfig.json');
AWS.config.update({ region: 'ap-northeast-2' });

const s3 = new AWS.S3();

function up(fileName) {
  let param = {
    Bucket: 'beom',
    ACL: 'public-read',
    Body: fs.createReadStream(__dirname + '/image.jpg'),
    ContentType: 'image/jpeg',
    Key: `images/image${fileName}`
  };

  s3.upload(param, function(err, data) {
    if (err) {
      console.log(err);
    }
    console.log(data);
  });
}
module.exports = up;
