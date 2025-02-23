const users = {
    schema: 'users',
    info: [
        {
            table: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'email',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'hashedPassword',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'created_at',
                    type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
                },
                {
                    name: 'deleted_at',
                    type: 'TIMESTAMP NULL'
                }
            ],
            queries: {
                getUserByEmail: `SELECT * FROM users WHERE email = $email`,
                getUserById: `SELECT * FROM users WHERE id = $id`,
                getAllUsers: 'SELECT * FROM users',
                createUser: `INSERT INTO users (email, hashedPassword) VALUES ($email, $hashedPassword)`,
                deleteUser: `UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = $id`
            }  
        },
        {
            table: 'roles',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'roleId',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'userId',
                    type: 'INTEGER NOT NULL'
                },
                {
                    name: 'created_at',
                    type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
                },
                {
                    name: 'deleted_at',
                    type: 'TIMESTAMP NULL'
                }
            ],
            queries: {
                getUserRoles: `SELECT * FROM roles WHERE userId = $userId`,
                createUserRole: `INSERT INTO roles (roleId, userId) VALUES ($roleId, $userId)`,
                deleteUserRole: `UPDATE roles SET deleted_at = CURRENT_TIMESTAMP WHERE id = $id`
            }
        },
        {
            table: 'info',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'userId',
                    type: 'INTEGER NOT NULL'
                },
                {
                    name: 'firstName',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'lastName',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'phone',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'created_at',
                    type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
                },
                {
                    name: 'deleted_at',
                    type: 'TIMESTAMP NULL'
                }
            ],
            queries: {
                getUserInfo: `SELECT * FROM info WHERE userId = $userId`,
                createUserInfo: `INSERT INTO info (userId, firstName, lastName, phone) VALUES ($userId, $firstName, $lastName, $phone)`,
                deleteUserInfo: `UPDATE info SET deleted_at = CURRENT_TIMESTAMP WHERE id = $id`
            }
        },
        {
            table: 'management',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'userId',
                    type: 'INTEGER NOT NULL'
                },
                {
                    name: 'managerId',
                    type: 'INTEGER NOT NULL'
                },
                {
                    name: 'created_at',
                    type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
                },
                {
                    name: 'deleted_at',
                    type: 'TIMESTAMP NULL'
                }
            ],
            queries: {
                getUserManager: `SELECT * FROM management WHERE userId = $userId`,
                createUserManager: `INSERT INTO management (userId, managerId) VALUES ($userId, $managerId)`,
                deleteUserManager: `UPDATE management SET deleted_at = CURRENT_TIMESTAMP WHERE id = $id`
            }
        }
    ]
}

module.exports = users;