var path = require('path'),
    fs = require('fs');

fs.stat('./private/privatekey.pem', function(err, stat) {
    if(err == null) {
        exports.privateKey = fs.readFileSync(path.join(__dirname, './private/privatekey.pem')).toString();
    } else if(err.code == 'ENOENT') {
        // file does not exist
        console.log('No private key');
        exports.privateKey = null;
    } else {
        console.log('Some other error: ', err.code);
    }
});

fs.stat('./private/certificate.pem', function(err, stat) {
    if(err == null) {
        exports.certificate = fs.readFileSync(path.join(__dirname, './private/certificate.pem')).toString();
    } else if(err.code == 'ENOENT') {
        // file does not exist
        console.log('No certificate');
        exports.certificate = null;
    } else {
        console.log('Some other error: ', err.code);
    }
});




