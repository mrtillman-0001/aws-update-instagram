const { S3Service } = require('./s3.service');
const { InstagramService } = require('./instagram.service');
const s3 = new S3Service();

const handler = async () => {
  return await 
    s3.listObjects()
      .then(objects => objects.filter(object => object.Size > 0))
      .then(objects => {
        if(objects.length){
          const object = objects[0];
          const imageUrl = `https://icons.avatarbox.io/${object.Key}`;
          const instagram = new InstagramService();
          instagram.login()
            .then(() => instagram.upload(imageUrl))
            .then(() => s3.deleteObject(object.Key))
            .catch(err => {
              console.error('Instagram update failed: ', err);
            })
        }
      })
}

exports.handler = handler;
