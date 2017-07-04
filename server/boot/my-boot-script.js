module.exports = function (app) {
    // Creating admin account
    var User = app.models.ImadaUser;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    User.create({ username: 'admin', email: 'admin@mechagk.dk', password: 'pleaseChangeMe' }, function (err, user) {
        if (err) throw err;

        Role.create({
            name: 'admin'
        }, function (err, role) {
            if (err) throw err;
            console.log(role);

            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: user.id
            }, function (err, principal) {
                if (err) throw err;
                console.log(principal);
            });
        })
    });

    console.log("Remember to change admin password from 'pleaseChangeMe'!");

    // For testing only
    User.create({ username: 'tester', email: 'tester@mechagk.dk', password: 'WeakPassword', balance: 600}, function(err, user) {
        if (err) throw err;

        console.log(user);
    });

    User.create({ username: 'tester2', email: 'tester2@mechagk.dk', password: 'WeakPassword'}, function(err, user) {
        if (err) throw err;

        console.log(user);
    });
}