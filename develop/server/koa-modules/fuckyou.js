module.exports = {
  type: 'get',
  url: '/api/fuckyou',
  func: async (o,next) => {
    o.myage = 31;
    await next();
    o.shitloadofmoney.push(11);
    o.shitloadofmoney.push(o.myname);
    o.shitloadofmoney.push(o.myage);
    o.body = o.shitloadofmoney;
  }
}