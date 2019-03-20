const hello = require('./hello.js');
const nigger = require('./nigger.js');
const upload = require('./upload.js');
const routeList = [hello, nigger,upload];
function initRoutes(instance){
  routeList.forEach(item => {
    let { type,url,func } = item;
    instance[type](url, func);
  })
}
module.exports = initRoutes;