const {parallelLimit, reflectAll} = require('async');
const {post}                 = require('./core');

const directory = '../seed/prod-data-seed';

const documents = [
  {
    resourceName: 'ProductionInvBaseUnit',
    data:         require(directory + '/production-baseunit.json')
  },
    {
        resourceName: 'ProductionInvItem',
        data:         require(directory + '/production-item.json')
    },
  {
    resourceName: 'ProductionInvOnHand',
    data:         require(directory + '/production-on-hand.json')
  },
  {
    resourceName: 'ProductionInvUnitOfMeasure',
    data:         require(directory + '/production-uom.json')
  },
  {
    resourceName: 'ProductionInvUomConversion',
    data:         require(directory + '/production-conversion.json')
  },
  {
    resourceName: 'ProductionInvCategory',
    data:         require(directory + '/production-category.json')
  },
  {
    resourceName: 'ProductionInvRecipe',
    data:         require(directory + '/production-recipe.json')
  },
  {
    resourceName: 'ProductionInvRecipeOnHand',
    data:         require(directory + '/production-recipe-on-hand.json')
  },
  {
        resourceName: 'ProductionInvForecastQuantity',
        data:         require(directory + '/production-forecast.json')
  },
  {
        resourceName: 'ProductionInvOHUpdateTransaction',
        data:         require(directory + '/production-ohupdatetransaction.json')
  }
];

const seedDataFunc = ({baseUrl, token, storeKey}, next) => {
  const tasks = documents.map(item => {
    return (cb) => {
      post({baseUrl, token, payload: item.data, document: item.resourceName}, cb);
    };
  });
  parallelLimit(reflectAll(tasks), 3, (err) => {
    if (!err) {
      console.log('** SEED DONE **');
      next(null, null);
    } else {
      next(err);
    }
  });
};

module.exports = {
  seedDataFunc
};
