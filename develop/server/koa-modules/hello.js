module.exports = {
  type: 'get',
  url: '/api/hello',
  func: async (o,next) => {
    o.shitloadofmoney = [];
    o.shitloadofmoney.push(' zmz is testing from hello.js!!!!! ');
    await next();
    o.body = o.shitloadofmoney;
  }
}