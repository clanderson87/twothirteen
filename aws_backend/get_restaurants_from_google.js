const key = require('../src/secrets/GOOGLE_PLACES_API_KEY');

const https = require('https');
const options = {
    hostname: 'maps.googleapis.com/maps/api/place/textsearch/json?query=',
    path: 'the%20southern%20steak%20and%20oyster+&key=' + key + '&type=restaurant',
    method: 'GET'
};
    
    const req = https.requestt(options, (res) => {
        res.on('data', (d) => {
            console.log(d)
        });
    req.send();
    });
