function shit() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, '2秒后返回!!!');
  })
}
function rawData(o) {
  let rawdata = '';
  return new Promise((resolve, reject) => {
    try {
      o.req.on('data', data => {
        console.log(data, '............');
        rawData += data;
      });
      o.req.on('end', () => {
        console.log(data, '............');
        resolve(rawdata);
      });
    } catch (e) {
      resolve(" ERRROR" + e.toString());
    }
  })
}
module.exports = {
  type: 'post',
  url: '/api/nigger',
  func: async (o, next) => {
    console.log(` shit nigger!!`);
    // let { name = 'danzile' } = o.request.body;
    o.shitloadofmoney = [];
    // o.rawData = await rawData(o);
    // o.shitloadofmoney.push(`nigger name is ${name}`);
    let r = await shit();
    o.shitloadofmoney.push(r);
    o.body = o.shitloadofmoney;
    // await next();
    // next();
    console.log(o.rawData, ' raw data');
    o.shitloadofmoney.push(' NIGGER ROUTER !! ');
    o.body = o.shitloadofmoney;
  }
}