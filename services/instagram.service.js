require('dotenv').config();
const { IgApiClient } = require("instagram-private-api");
const fetch = require('node-fetch');

class InstagramService {
  constructor(){
    this.ig = new IgApiClient();
  }

  async login() {
    const { ig } = this;
    const username = process.env.IG_USERNAME;
    const password = process.env.IG_PW;
    ig.state.generateDevice(username);
    try {
      await ig.account.login(username, password);
    } catch (error) {
      console.log("Instagram login failed: ", error);
    }
  }

  async getImageBuffer(imageUrl){
    return await fetch(imageUrl).then(res => res.buffer());
  }

  async postImage(imageBuffer, caption){
    return await this.ig.publish.photo({
      file: imageBuffer,
      caption
    });
  }

  async setProfileIcon(imageBuffer){
    return await this.ig.account.changeProfilePicture(imageBuffer);
  }

}

module.exports = { InstagramService }
