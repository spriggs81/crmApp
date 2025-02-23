const settings = {
    schema: 'settings',
    info: [
        {
            table: 'roles',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'name',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'description',
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
            table: 'status',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'name',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'description',
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
            table: 'managers',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
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
                    name: 'email',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'phone',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'departmentId',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'locationId',
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
            table: 'departments',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'name',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'description',
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
            table: 'locations',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'name',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'description',
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
        }
    ]
}

module.exports = settings;