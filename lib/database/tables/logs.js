const logs = {
    schema: 'logs',
    info: [
        {
            table: 'logins',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'user_id',
                    type: 'INTEGER NULL'
                },
                {
                    name: 'email',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'status',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'reason',
                    type: 'VARCHAR(250) NULL'
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
            table: 'actions',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'function_name',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'functions_id',
                    type: 'INTEGER NULL'
                },
                {
                    name: 'data',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'status',
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
        },
        {
            table: 'errors',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'user_id',
                    type: 'INTEGER NOT NULL'
                },
                {
                    name: 'data',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'error',
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

export default logs;