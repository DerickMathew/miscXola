const config = require('config');
const axios = require('axios');
const chalk = require('chalk');

const host = config.get('host');
const xApiKey = config.get('devApiKey');

const constructFeatureToggleUrl = (featureName, sellerId) => {
    return `${host}/api/sellers/${sellerId}/features/${featureName}`;
}

const enableFeatureForSeller = async (featureName, sellerId) => {
    const url = constructFeatureToggleUrl(featureName, sellerId);
    const data = { 'id': featureName};
    const configs = { headers: {'X-API-KEY': xApiKey}};

    axios.put(url, data, configs)
      .then(response => {
        console.log('\n' + chalk.green(`${sellerId}: ${featureName}`));
      })
      .catch(error => {
        console.log('\n' + chalk.red(`${sellerId}: ${featureName}`));
        // console.log(url);
        // console.log(error.response.data);
      });
}

const sellerIds = config.get('sellerIds');
const featureNames = config.get('featureNames');

const main = async () => {
    sellerIds.forEach(async (sellerId) => {
        featureNames.forEach(async (featureName) => {
            await enableFeatureForSeller(featureName, sellerId);
        })
    })
}

main();

/*

*/
