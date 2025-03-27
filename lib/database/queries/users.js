const userQueries = {
    // Related to the users.users table
    getUserByEmail: `SELECT * FROM users.users WHERE deleted_at is null and email = '$email'`,
    getUserById: `SELECT * FROM users.users WHERE deleted_at is null and userId = '$userId'`,
    getUserByTableId: `select id, deleted_at from users.users where id = '$tableId'`,
    getAllActiveUsers: 'SELECT * FROM users.users where deleted_at is null order by id desc',
    getAllDeletedUsers: 'select * from users.users where deleted_at is not null order by deleted_at desc',
    createUser: `INSERT INTO users.users (userId, email, hashedPassword) VALUES ('$userId', '$email', '$hashedPassword')`,
    deleteUser: `UPDATE users.users SET deleted_at = CURRENT_TIMESTAMP WHERE deleted_at is null and id = '$id'`,

    // Related to the users.roles table
    addRoleToUser: `insert into users.roles (roleId, userId) values ($roleId, '$userId')`,
    getRoleByUserId: `select * from users.roles where deleted_at is null and userId = '$userId'`,
    deleteUserRole: `update users.roles set deleted_at = current_timestamp where deleted_at is null and id = $id`,
    getUserRoleByTableId: `select id, deleted_at from users.roles where id = $tableId`,

    // Related to the users.info table
    addUserInfo: `insert into users.info (userId, firstName, lastName, phone) values ('$userId', '$firstName', '$lastName', '$phone')`,
    getInfoByUserId: `select * from users.info where deleted_at is null and userId = '$userId'`,
    getUserInfoByTableId: `select id, deleted_at from users.info where id = '$tableId'`,
    deleteUserInfo: `update users.info set deleted_at = current_timestamp where id = '$tableId'`,

    // Related to the users.management table
    addUserManager: `insert into users.management (userId, managerId) values ('$userId', $managerId)`,
    getUserManagerById: `select * from users.management where deleted_at is null and userId = '$userId'`,
    getUserManagerByTableId: `select id from users.management where deleted_at is null and id = '$tableId'`,
    deleteUserManager: `update users.management set deleted_at = current_timestamp where id = '$tableId'`
}

export default userQueries