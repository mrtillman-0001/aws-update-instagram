const { S3Service } = require('./services/s3.service');
const { InstagramService } = require('./services/instagram.service');
const s3 = new S3Service();

const handler = async () => {
  const instagram = new InstagramService();
  await instagram.login();

  const seedIcons = await s3.getNextSeedIcon()
                            .then(objects => {
                              if(objects && objects.length){
                                return objects.filter(object => object.Size > 0)
                              }
                            })

  if(seedIcons && seedIcons.length){
    const key = seedIcons[0].Key;
    const imageUrl = `https://icons.avatarbox.io/${key}`;
    const imageBuffer = await instagram.getImageBuffer(imageUrl);
    await instagram.setProfileIcon(imageBuffer);
    await instagram.postImage(imageBuffer, imageUrl);
    await s3.deleteSeedIcon(key);
  } else {
    const imageUrl = s3.getRandomIcon();
    const imageBuffer = await instagram.getImageBuffer(imageUrl);
    await instagram.setProfileIcon(imageBuffer);
  }

}

exports.handler = handler;
