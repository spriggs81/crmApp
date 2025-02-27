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
                    name: 'userId',
                    type: 'VARCHAR(250) NOT NULL'
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
            ]
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
            ]
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
            ]
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
            ]
        }
    ]
}

export default users;