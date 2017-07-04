module.exports = function (app) {
    randomString = function(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    var adminPassword = randomString(24, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    // Creating admin account
    var User = app.models.ImadaUser;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    User.create({ username: 'admin', email: 'admin@mechagk.dk', password: adminPassword }, function (err, user) {
        if (err) throw err;

        Role.create({
            name: 'admin'
        }, function (err, role) {
            if (err) throw err;

            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: user.id
            }, function (err, principal) {
                if (err) throw err;
            });
        })
    });

    console.log("Admin user created.\n\temail: admin@mechagk.dk\n\tpassword: " + adminPassword);

    // For testing only
    User.create({ username: 'tester', email: 'tester@mechagk.dk', password: 'WeakPassword', balance: 600}, function(err, user) {
        if (err) throw err;
    });

    User.create({ username: 'tester2', email: 'tester2@mechagk.dk', password: 'WeakPassword'}, function(err, user) {
        if (err) throw err;
    });
}