const {parallelLimit, reflectAll} = require('async');
const {del}                  = require('./core');

const documents = [
  'ProductionInvBaseUnit',
  'ProductionInvItem',
  'ProductionInvOnHand',
  'ProductionInvUnitOfMeasure',
  'ProductionInvUomConversion',
  'ProductionInvCategory',
  'ProductionInvRecipe',
  'ProductionInvRecipeOnHand',
  'ProductionInvForecastQuantity',
  'ProductionInvOHUpdateTransaction'
];

const clearDataFunc = ({baseUrl, token, storeKey}, next) => {
  const tasks = documents.map(document => {
    return (cb) => {
      del({document, baseUrl, token, storeKey}, cb);
    };
  });

  parallelLimit(reflectAll(tasks), 3, (err) => {
    if (!err) {
      console.log('** CLEAR DONE **');
      next(null, { baseUrl, token, storeKey });
    } else {
      next(err);
    }
  });
};

module.exports = {
  clearDataFunc
};
