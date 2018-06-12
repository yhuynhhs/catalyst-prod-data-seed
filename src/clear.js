const axios = require('axios');

const resourceAsClear = [
  'ProductionSuggestedThawQuantityJobLog',
  'ProductionSuggestedThawItemPull',
  'InventoryItem',
  'ProductionSchedule',
  'ProductionItemThawSetup',
  'InventoryOnHand',
  'InventoryForecastQuantity',
  'InventoryOHUpdateTransaction',
];

function clear() {
  const baseUrl  = this.baseUrl;
  const token    = this.token;
  const storeKey = this.storeKey;

  const singleClear = ({resourceName}) => {
    const where = (resourceName === 'InventoryForecastQuantity') ?
      `where={"store_number":"${storeKey}"}`:
      `where={"store_key":"${storeKey}"}`;
    const url = `${baseUrl}/${resourceName}?${where}`;
    return axios({
      method:  'DELETE',
      url,
      headers: {
        'Content-Type': 'application/json',
        'Cookie':       `ID_TOKEN=${token}`
      }
    })
  };

  const clearsAsPromise = resourceAsClear.map(resourceName => {
    return singleClear({resourceName});
  });

  return Promise.all(
    clearsAsPromise
  )
}

module.exports = clear;
