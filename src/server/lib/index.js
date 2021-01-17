"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
// @ts-ignore
const nuxt_1 = require("nuxt");
const app = express_1.default();
async function start() {
    const isDev = process.env.NODE_ENV !== 'production';
    // Init Nuxt.js
    const nuxt = await nuxt_1.loadNuxt({
        rootDir: path_1.default.join(__dirname, '../../'),
        for: isDev ? 'dev' : 'start',
    });
    const { host = process.env.HOST || '127.0.0.1', port = process.env.PORT || 3000, } = nuxt.options.server;
    // Enable live build & reloading on dev
    if (isDev) {
        nuxt_1.build(nuxt);
    }
    await nuxt.ready();
    // Give nuxt middleware to express
    app.use(nuxt.render);
    // Listen the server
    app.listen(port, host);
}
start();
//# sourceMappingURL=index.js.map