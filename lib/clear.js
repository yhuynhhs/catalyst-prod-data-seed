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
  // 'InventoryBaseUnit',
  // 'InventoryItem',
  // 'InventoryOnHand',
  // 'InventoryUnitOfMeasure',
  // 'InventoryUomConversion',
  // 'InventoryCategory',
  // 'InventoryRecipe',
  // 'InventoryRecipeOnHand',
  // 'InventoryForecastQuantity',
  // 'InventoryOHUpdateTransaction'
];

// const clearDataFunc = ({baseUrl, token, storeKey}, next) => {
const clearDataFunc = ({baseUrl, token}, next) => {
  const tasks = documents.map(document => {
    return (cb) => {
      del({document, baseUrl, token}, cb);
    };
  });

  parallelLimit(reflectAll(tasks), 3, (err) => {
    if (!err) {
      console.log('** CLEAR DONE **');
      next(null, { baseUrl, token});
    } else {
      next(err);
    }
  });
};

module.exports = {
  clearDataFunc
};
