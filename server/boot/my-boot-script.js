module.exports = function (app) {
    // Creating admin account
    var User = app.models.ImadaUser;
    User.create({ username: "admin", email: 'admin@mechagk.dk', password: 'StrongPassword' }, function (err, user) {
        if (err) return debug('%j', err);

        role.create({
            name: 'admin'
        }, function (err, role) {
            if (err) return debug(err);
            debug(role);

            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: user.id
            }, function (err, principal) {
                if (err) return debug(err);
                debug(principal);
            });
        })
    });

    console.log("Remember to change admin password from 'StrongPassword'!")
}