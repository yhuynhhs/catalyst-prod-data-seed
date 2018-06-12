const environment                                 = process.env._ENV.trim();
const {waterfall, parallel, reflectAll, constant} = require('async');
const {clearDataFunc}                             = require('./clear');
const {seedDataFunc}                              = require('./seed');

require('dotenv').config({
  path: `${process.cwd()}/env/${environment}.env`
});

const that = {
  baseUrl:  process.env.BASE_URL,
  token:    process.env.TOKEN,
  storeKey: process.env.STORE_KEY
};

waterfall([
  constant(that),
  clearDataFunc,
  seedDataFunc
], (err, results) => {
  console.log('results: ', results);
});
