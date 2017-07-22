// const key = require('../src/secrets/GOOGLE_PLACES_API_KEY');

const https = require('https');

const options = {
    hostname: 'maps.googleapis.com',
    path: '/maps/api/place/textsearch/json?query=the%20southern%20steak%20and%20oyster+&key=' + '' + '&type=restaurant',
    method: 'GET'
};

https.get(options, (res) => {
    let rawData = '';
    res.on('data', (c) => { rawData += c })
    res.on('end', () => {
        try{
            let parsedData = JSON.parse(rawData);
            offerResults(parsedData.results);
        } catch(e) {
            console.log('Error is', e.message);
        }
    });
});

const offerResults = data => {
    return data;
}

console.log(offerResults());