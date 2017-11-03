module.exports = function (app) {
    var User = app.models.ImadaUser;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    Role.exists(1, function (err, exists) {
        if (!exists) {
            Role.create({
                name: 'admin'
            }, function (err, role) {
                if (err) {
                    console.log('Could not create "admin" role. Loopback models are probably not migrated yet');
                    return;
                }

                // Admin cannot be created before 'admin' role, so we do not check if it exists
                createAdmin(User, RoleMapping, role);
            });
        }
        else {
            User.exists(1, function (err, exists) {
                if (!exists) {
                    role = Role.findById(1, function (err, role) {
                        if (err) throw err;

                        createAdmin(User, RoleMapping, role)
                    });
                }
            });
        }
    });
}

randomString = function (length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

createAdmin = function (User, RoleMapping, role) {
    var adminPassword = randomString(24, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    User.create({ username: 'admin', email: 'admin@mechagk.dk', password: adminPassword }, function (err, user) {
        if (err) {
            console.log('Could not create admin. Imada models are probably not migrated yet');
            return;
        }

        role.principals.create({
            principalType: RoleMapping.USER,
            principalId: user.id
        }, function (err, principal) {
            if (err) throw err;
        });
        console.log("Admin user created.\n\temail: admin@mechagk.dk\n\tpassword: " + adminPassword);
    });
}