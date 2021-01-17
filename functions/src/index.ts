import * as functions from 'firebase-functions'
const { Nuxt } = require("nuxt");

const config = {
  dev: false,
  buildDir: "lib/nuxt",
  build: {
    publicPath: "/public/"
  }
};
const nuxt = new Nuxt(config);



exports.ssrapp = functions.https.onRequest(async (request, response)=> {
  await nuxt.ready()
  nuxt.render(request, response)
});
