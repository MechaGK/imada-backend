'use strict';

module.exports = function (Imadauser) {
    Imadauser.spend = function (id, amount, time, options, cb) {
        Imadauser.findById(id, function (err, user) {
            if (err) return cb(err);

            var canSpend = user.balance >= amount;
            if (canSpend) {
                Imadauser.app.models.Transaction.create({
                    imadaUserId: id,
                    amount: -amount,
                    timeOnDevice: time
                }, function (err, transaction) {
                    if (err) return cb(err);

                    user.balance -= amount;
                    user.save();

                    cb(null, true, transaction.id);
                });
            } else {
                cb(null, false, undefined);
            }
        })
    };
    Imadauser.remoteMethod('spend', {
        accepts: [
            { arg: 'id', type: 'number', required: true },
            { arg: 'amount', type: 'number', required: true },
            { arg: 'time', type: 'date' },
            { arg: 'options', type: 'object', http: 'optionsFromRequest' }
        ],
        returns: [
            { arg: 'success', type: 'boolean' },
            { arg: 'transactionId', type: 'number' }
        ],
        http: { path: '/spend', verb: 'post' }
    });
    Imadauser.addFunds = function(id, amount, options, cb) {
        Imadauser.findById(id, function(err, user) {
            if (err) return cb(err);

            Imadauser.app.models.Transaction.create({
                    imadaUserId: id,
                    amount: amount,
                    authorizedBy: options.accessToken.userId
                }, function (err, transaction) {
                    if (err) return cb(err);

                    user.balance += amount;
                    user.save();

                    cb(null, true, transaction.id);
                });
        })
    };
    Imadauser.remoteMethod('addFunds', {
        accepts: [
            { arg: 'id', type: 'number', required: true },
            { arg: 'amount', type: 'number', required: true },
            { arg: 'options', type: 'object', http: 'optionsFromRequest' }
        ],
        returns: [
            { arg: 'success', type: 'boolean' },
            { arg: 'transactionId', type: 'number' }
        ],
        http: { path: '/addFunds', verb: 'post' }
    });
};
