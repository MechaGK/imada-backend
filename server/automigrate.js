var server = require('./server');
var ds = server.dataSources.imadaDatabase;
var imadaTables = ['ImadaUser', 'Transaction'];
ds.automigrate(imadaTables, function (er) {
    if (er) throw er;
    console.log('Imada tables [' - imadaTables - '] created in ', ds.adapter.name);
    ds.disconnect();
});