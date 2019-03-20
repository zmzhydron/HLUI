const fs = require("fs");
const koaMulter = require('koa-multer');
const Path = require("path");
// const upload = koaMulter({
//   dest: Path.join(__dirname, "../uploaded")
// })
// module.exports = (o,next) => {
//   return [
//     upload.single("hehe"),
//     async (o,next) => {
//       console.log(o.req.file, '``````````````````````');
//       // 重命名文件;
//       let { originalname, destination, path } = o.req.file;
//       let r = fs.renameSync(path, destination + "\\" + originalname);
//       o.body = 'shit la';
//     }
//   ]
// }
module.exports = {
  type: 'post',
  url: '/api/uploadify',
  func: async (o,next) => {
    // console.log(`----------->>>>>>>>>>uploadify`);
    // console.log(o.request.files);
    // // console.log(o.request.body);
    // console.log(`-----------<<<<<<<<<<<<<<<<<<uploadify`);
    o.body = '上传成功!!!!';
    await next();
  }
}