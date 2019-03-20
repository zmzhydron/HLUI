const KOA = require("koa2");
const fs = require("fs");
const Path = require("path");
// const Buffer = require("Buffer");
const koaStatic = require('koa-static');
const koaRouter = require("koa-router")();
const koaBody = require('koa-body');
const combineRouter = require('./koa-modules/routeIndex.js')
const app = new KOA();
console.log(__dirname, '__dirname');
app.context.myname = 'zmz';
app.context.shitloadofmoney = [];
function rawData(o) {
  let rawdata = "";

  return new Promise((resolve, reject) => {
    const onData = chunk => {
      console.log(chunk, chunk.toString('utf-8'))
      // rawdata.push(chunk);
      rawdata += chunk;
    }
    const onEnd = () => {
      console.log("readable stream onEnd ");
      resolve(rawdata);
    }
    const cleanUp = () => {
      console.log("readable stream closed ");
      rawdata = '';
      o.req.removeListener('data', onData);
      o.req.removeListener('end', onEnd);
      o.req.removeListener('close', cleanUp);
    }
    o.req.on('data', onData);
    o.req.on('end', onEnd);
    o.req.on('close', cleanUp)
  })
  // return new Promise((resolve, reject) => {
  //   setTimeout(resolve, 1000, 1);
  // })
}
app.use(async (o, next) => {
  o.rawData = await rawData(o);
  const buf = Buffer.from('hello world', 'ascii');
  console.log(`waiting for next `, o.rawData, buf.toString("utf-8"));
  await next();
})
app.use(koaStatic(Path.resolve(__dirname, './')));
// app.use(koaBody(
//   {
//     multipart: true,
//     // encoding:'gzip',
//     formidable: {
//       uploadDir: Path.join(__dirname, './../uploaded'),
//       keepExtensions: true,
//       maxFieldsSize: 2 * 1024 * 1024,
//       onFileBegin: (name, file) => {
//         // console.log(file, '$$$$$$$$$', name, ' name -----------');
//         // 获取文件后缀
//         console.log(`${file.name} is the file.name `);
//         // const ext = getUploadFileExt(file.name);
//         // 最终要保存到的文件夹目录
//         const dir = Path.join(__dirname, `./../uploaded`);
//         console.log(dir, ' dir ,,,,,,,,,,,,,,');
//         // 检查文件夹是否存在如果不存在则新建文件夹
//         // checkDirExist(dir);
//         // 重新覆盖 file.path 属性
//         file.path = `${dir}/${file.name}`;
//         app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
//         app.context.uploadpath[name] = `${dir}/${file.name}`;
//       },
//       onError: (err) => {
//         console.log(err, ' ------------ ');
//       }
//     }
//   }
// ));
// app.use(koaRouter.routes()).use(koaRouter.allowedMethods());

// 最终路由包裹
app.use(async (o, next) => {
  o.shitloadofmoney.push('最终路由包裹');
  o.myinfo = o.request;
  await next();
  o.shitloadofmoney.push(' 上一个 next ');
  console.log(o.body, '$$$$$$$$$$$$$$$$$');
  o.body = {
    name: o.body + " ,fuck you man",
    // myinfo: JSON.stringify(o.req, null, 2),
    rawData: o.rawData,
    myshitofshit: o.myshitofshit,
    // myinfo: o.myinfo,
    alter: true
  }
  // o.body = '~~~~~~~~~';
})
app.use(koaRouter.routes())

// 绑定路由
combineRouter(koaRouter);
app.use(async (o, next) => {
  if (!o.shitloadofmoney) {
    o.shitloadofmoney = [];
  }
  o.shitloadofmoney.push(1);
  await next();
  o.shitloadofmoney.push(10);
})
app.use(async (o, next) => {
  o.shitloadofmoney.push(2);
  await next();
  o.shitloadofmoney.push(9);
  o.state.nigger = 'fyuck you nigger!!';
})
app.use(async (o, next) => {
  o.shitloadofmoney.push(3);
  await next();
  o.shitloadofmoney.push(8);
})
app.use(async (o, next) => {
  o.shitloadofmoney.push(4);
  // await next();
  // throw new Error("Eeeeeeeeeee");
  o.myshitofshit = 'shit nigger your are back !! ';
  o.shitloadofmoney.push(7);
})
app.use(async (o, next) => {
  o.shitloadofmoney.push(5);
  await next();
  o.shitloadofmoney.push(6);
})



app.listen("9991", () => {
  console.log("koa2 start @@@@ 9991");
});
app.on('error', (err, o) => {
  console.log(o, ' ERROR!! ');
  o.body = err;
});

