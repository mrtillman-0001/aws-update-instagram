const { S3Service } = require('./s3.service');
const { InstagramService } = require('./instagram.service');
const s3 = new S3Service();

const handler = async () => {
  return await 
    s3.listObjects()
      .then(objects => {
        if(objects && objects.length){
          return objects.filter(object => object.Size > 0)
        }
      })
      .then(objects => {
        if(objects && objects.length){
          const object = objects[0];
          return {
            imageUrl: `https://icons.avatarbox.io/${object.Key}`,
            key: object.Key
          };
        }
      })
      .then(async result => {
        if(result){
          const { imageUrl, key } = result;
          console.log('uploading image: ', imageUrl);
          const instagram = new InstagramService();
          await instagram.login();
          await instagram.upload(imageUrl);
          await s3.deleteObject(key);
        }
      })
      .catch(err => {
        console.error('Instagram update failed: ', err);
      })
}

exports.handler = handler;
