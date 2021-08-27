const {
  S3Client,
  DeleteObjectCommand,
  ListObjectsCommand,
} = require("@aws-sdk/client-s3");
const galleryIcons = require('../common/gallery-icons.json');

class S3Service {
  constructor() {
    this._bucketName = "icons.avatarbox.io.seed";
    this._client = new S3Client({
      region: 'us-east-1',
    });
  }

  async deleteSeedIcon(Key){
    const command = new DeleteObjectCommand({
      Bucket: this._bucketName,
      Key
    });
    return await this._client.send(command);
  }

  async getNextSeedIcon() {
    const command = new ListObjectsCommand({
      Bucket: this._bucketName,
      MaxKeys: 2,
    })
    const result = await this._client.send(command);
    return result.Contents;
  }

  getRandomIcon() {
    const randomIndex = Math.floor(Math.random() * galleryIcons.length);
    return galleryIcons[randomIndex];
  }
  
}

module.exports = { S3Service };
