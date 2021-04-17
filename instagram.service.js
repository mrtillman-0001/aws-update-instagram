const { IgApiClient } = require("instagram-private-api");
const fetch = require('node-fetch');
const getInstagramLogin = require('./get-instagram-login');

class InstagramService {
  constructor(){
    this.ig = new IgApiClient();
  }

  async login() {
    const { ig } = this;
    const { username, password } = await getInstagramLogin();
    ig.state.generateDevice(username);
    return await ig.account.login(username, password);
  }

  async upload(imageUrl){
    const { ig } = this;
    const imageBuffer = await fetch(imageUrl).then(res => res.buffer());
    try {
      await ig.account.changeProfilePicture(imageBuffer);  
    } catch (error) {
      console.error("failed to update profile icon: ", error);
    }    
    await ig.publish.photo({
      file: imageBuffer,
      caption: imageUrl
    });
  }
}

module.exports = { InstagramService }
