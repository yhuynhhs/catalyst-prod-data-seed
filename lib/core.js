const axios = require('axios');
const request = require('request');

const del = ({document, baseUrl, token, storeKey = ''}, next) => {
    // const where = (document === 'InventoryForecastQuantity') ?
    //     `where={"store_number":{"$eq":"${storeKey}"}}` :
    //     `where={"store_key":{"$eq":"${storeKey}"}}`;
    // const url = `${baseUrl}/${document}?${where}`;
    const url = `${baseUrl}/${document}`;
    // console.log('url : ', url);
    request({
        method: 'DELETE',
        url,
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `ID_TOKEN=${token}`
        }
    }, (err) => {
        if (err) {
            console.log(`[DELETE] ${document} fail.`);
            next(err);
        } else {
            console.log(`[DELETE] ${document} done.`);
            next(null);
        }
    });
};

const post = ({document, baseUrl, token, payload}, next) => {
    const url = `${baseUrl}/${document}`;

    axios({
        method: 'POST',
        url,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `ID_TOKEN=${token}`
        }
    })
        .then(() => {
            console.log(`[SEED] ${document} done.`);
            next(null, null);
        }).catch((err) => {
        console.log(`[SEED] ${document} fail.`);
        next(err);
    });
};

module.exports = {
    del,
    post
};
