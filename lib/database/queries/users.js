const userQueries = {
    // Related to the users.users table
    getUserByEmail: `SELECT * FROM users.users WHERE deleted_at is null and email = '$email'`,
    getUserById: `SELECT * FROM users.users WHERE deleted_at is null and userId = '$userId'`,
    getUserByTableId: `select id, deleted_at from users.users where id = '$tableId'`,
    getAllUsers: 'SELECT * FROM users.users where deleted_at is null order by id desc',
    createUser: `INSERT INTO users.users (userId, email, hashedPassword) VALUES ('$userId', '$email', '$hashedPassword')`,
    deleteUser: `UPDATE users.users SET deleted_at = CURRENT_TIMESTAMP WHERE deleted_at is null and id = '$id'`,

    // Related to the users.roles table
    addRoleToUser: `insert into users.roles (roleId, userId) values ('$roleId', '$userId')`
}

export default userQueries