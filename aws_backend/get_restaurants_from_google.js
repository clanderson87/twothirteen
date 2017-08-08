exports.handler = (event, context, callback) => {
    const https = require('https');
    const { requestTerm, latitude, longitude, radius, type, authenticate, denyPermission } = event;

    authenticate === false ? callback(null, { error: 'Please login and try again!'}) : null;

    let path = `/maps/api/place/textsearch/json?query=${requestTerm}&type=${type}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    denyPermission === false ? path += `&location=${latitude},${longitude}&radius=${radius}` : null;

    const options = {
        hostname: 'maps.googleapis.com',
        path,
        method: 'GET'
    };

    https.get(options, (res) => {
        let rawData = '';
        res.on('data', (c) => { rawData += c });
        res.on('end', () => {
            try{
                let parsedData = JSON.parse(rawData);
                return callback(null, parsedData.results);
            } catch(e) {
                console.log(e);
                return callback(null, { error: "Server Error" });
            }
        });
    });
};