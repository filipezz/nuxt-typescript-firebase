
 <img width="75" src="https://firebase.google.com/downloads/brand-guidelines/SVG/logo-logomark.svg?hl=pt-br"/> <img width="70" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/500px-Plus_symbol.svg.png"/>  <img width="130" src="https://nuxtjs.org/logos/nuxt-icon.png"/>


# Firebase deploy with Nuxt

To get this working we need to `build` our nuxt project and then have a Firebase Function to host our frontend and Hosting to serve our static files.
## Project structure

    .
    ├── functions                     # Firebase Functions folder
    │   ├── lib                       # Compiled files from 'src'         
    │   └── src                       # Functions http onRequest            
    ├── public                        # Generated static files               
    └── src   
         ├── .nuxt                    # Compiled files for dev local server      
         ├── server                   # Express server used for SSR       
         └── ...                                 
  
## Predeploy scripts
These scripts will automate some processes to make the deploys work

* Nuxt.js app in src/ should be built for production
* nuxt.config.js and the Nuxt.js server build should be copied into functions/ for Firebase Cloud Functions deployment.
* Nuxt.js client build and other static assets should be copied into public/ for Firebase Hosting deployment.
* Deploy the Firebase Cloud Functions and Firebase Hosting

#### Functions
```bash
      npm --prefix src run build,
      rimraf -rf functions/src/nuxt,
      cp -r src/.nuxt/ functions/lib/nuxt/,
      cp src/nuxt.config.js functions/src,
      cp src/nuxt.config.js functions/lib,
      npm --prefix functions run build
```
#### Hosting

```bash
      rimraf -rf public/*
      && mkdir  public/_nuxt 
      && cp -a src/.nuxt/dist/client/. public/_nuxt 
      && cp -a src/static/. public/ 
      && cp -a public_base/. public/

```

## Usage

### Dev enviroment

```bash
cd src
npm install
npm run dev
```
### Prod enviroment

```bash
firebase deploy
```

### Prod enviroment (local with firebase emulators)

```bash
cd functions
npm install
npm run serve
```

## Reference

https://medium.com/likecoin/nuxt-js-express-api-in-typescript-on-firebase-cloud-functions-ae43cf717992
https://medium.com/likecoin/quick-nuxt-js-ssr-prototyping-with-firebase-cloud-functions-5277553610a8
