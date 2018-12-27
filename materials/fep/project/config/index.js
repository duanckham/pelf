module.exports = process.env.MODE === 'production'
  ? require(`${__dirname}/production.js`)
  : require(`${__dirname}/development.js`);