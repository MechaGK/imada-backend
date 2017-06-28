var path = require('path'),
    fs = require('fs');


var privateKey;
var certificate;
try {
    privateKey = fs.readFileSync(path.join(__dirname, './private/privatekey.pem')).toString();
} catch (err) {
    if (err.code === 'ENOENT') {
        console.log('Private key not found');
    } else {
        console.log('An error occured while reading private key: ', err.code);
    }
}

try {
    certificate = fs.readFileSync(path.join(__dirname, './private/certificate.pem')).toString();
} catch (err) {
    if (err.code === 'ENOENT') {
        console.log('Certificate not found');
    } else {
        console.log('An error occured while reading certificate: ', err.code);
    }
}

exports.privateKey = privateKey;
exports.certificate = certificate;
